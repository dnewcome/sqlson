#!/bin/bash

curl localhost:3000/query -XPOST --header Content-Type:"application/json" \
	-d '[ "parent", null, { "id":"id", "text":"text", "children": [ "child", {"id":"id", "text":"text" } ] } ]'

# should yield
# [{"id":1,"text":"first parent","children":[{"id":1,"text":"child 1 of first parent"},{"id":2,"text":"child 2 of first parent"}]},{"id":1,"text":"first parent","children":[{"id":1,"text":"child 1 of first parent"},{"id":2,"text":"child 2 of first parent"}]}]
