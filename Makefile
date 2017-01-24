LIBS=
RUN=./run
RUNFLAGS=

.PHONY: modules src clean run

AST = $(patsubst %.lithp, %.ast, $(wildcard *.lithp))

SUBDIRS = modules src
default: $(AST) final $(SUBDIRS)
all: default

FINAL=

%.ast: %.lithp
	$(eval FINAL += $<)

run: livium.ast
	$(RUN) $<

final:
	@if [ "$(FINAL)"x != "x" ]; then $(RUN) -c $(FINAL); fi

$(SUBDIRS):
	$(MAKE) -C $@

clean:
	-rm -f *.ast
	$(MAKE) -C modules clean
	$(MAKE) -C src clean

