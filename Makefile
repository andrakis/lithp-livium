LIBS=
RUN=./run
RUNFLAGS=-DBORDER
APP=livium.ast

.PHONY: modules src clean run node_modules/lithp

AST = $(patsubst %.lithp, %.ast, $(wildcard *.lithp))

SUBDIRS = modules src node_modules/lithp
default: $(AST) final $(SUBDIRS)
all: default $(APP) run

FINAL=

%.ast: %.lithp
	$(eval FINAL += $<)

run: default $(SUBDIRS)
	$(RUN) livium.ast $(RUNFLAGS)

final:
	@if [ "$(FINAL)"x != "x" ]; then $(RUN) -c $(FINAL); fi

$(SUBDIRS):
	$(MAKE) -C $@

clean:
	-rm -f *.ast
	$(MAKE) -C modules clean
	$(MAKE) -C src clean
	$(MAKE) -C node_modules/lithp clean

