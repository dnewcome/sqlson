-- test data
use jsquery;
INSERT INTO `parent` VALUES (1,'first parent');
INSERT INTO `child` VALUES (1,'child 1 of first parent',1),(2,'child 2 of first parent',1);
INSERT INTO `grandchild` VALUES (1,'grandchild 1 of first child',1),(2,'grandchild 2 of first child',1);
