Livium - A VI-like implementation for Lithp
===========================================

Uses the [Lithp](https://github.com/andrakis/node-lithp) language.

Attempts to provide an editor that acts in a similar way to VI/VIM.
This is at a very early stage, and exploring how to implement basic
features as a Lithp script.

Goals
=====

One of the goals is to provide a proper VI/VIM experience as a Lithp
program, and that a Lithp interpreter be installed into your favourite
editor to provide a better edit experience.

Some of the big IDE's such as NetBeans have user-created plugins that
alter the editor to get a VIM-like experience. However, I have found
these to be lacking in key features.
Some IDE's have plugins that embed a whole new editor, but VIM specifically
has not been done by anyone. This is due in part to the large codebase,
making it very difficult to port to other languages.

Writing an editor in Lithp and implementing a Java interpreter would
allow me to write a plugin that would allow Livium to act as the text
editor.
The interpreter itself is very simple, so should be easy to convert to
Java, C++, C#, and any other language. Some languages may make this a
little more difficult, but any that implement operator overrides will
be fairly simple to implement.

Porting an editor interface to another IDE is often a difficult task.
My solution would only require implementing an interpreter and an
interface to the editor. Livium would handle the rest.

Additionally, Livium can be developed and working before any of the
above is worked on. This will allow for much quicker development.

