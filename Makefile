LIBS=
RUN=./run
RUNFLAGS=
APP=livium.lithp

.PHONY: modules src clean run node_modules/lithp

AST = $(patsubst %.lithp, %.ast, $(wildcard *.lithp))

SUBDIRS = modules src node_modules/lithp
default: $(AST) final $(SUBDIRS)
all: default $(APP) run

FINAL=

%.ast: %.lithp
	$(eval FINAL += $<)

run: $(APP) $(SUBDIRS)
	$(RUN) livium.ast

final:
	@if [ "$(FINAL)"x != "x" ]; then $(RUN) -c $(FINAL); fi

$(SUBDIRS):
	$(MAKE) -C $@
	$(MAKE) -C $@

clean:
	-rm -f *.ast
	$(MAKE) -C modules clean
	$(MAKE) -C src clean
	$(MAKE) -C node_modules/lithp clean

