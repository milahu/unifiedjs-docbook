# Attribute-Set Functions

## `lib.attrset.attrByPath`

```hs nix
attrByPath :: [String] -> Any -> AttrSet -> Any 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.attrByPath"} -->

Return an attribute from within nested attribute sets.

### Parameters

#### attrPath

A list of strings representing the path through the nested attribute set `set`.

#### default

Default value if `attrPath` does not resolve to an existing value.

#### set

The nested attributeset to select values from.

### Examples

#### Extracting a value from a nested attribute set

```nix
let set = { a = { b = 3; }; };
in lib.attrsets.attrByPath [ "a" "b" ] 0 set
```

```nix
3
```

#### No value at the path, instead using the default

```nix
lib.attrsets.attrByPath [ "a" "b" ] 0 {}
```

```nix
0
```

## `lib.attrsets.hasAttrByPath`

```hs nix
hasAttrByPath :: [String] -> AttrSet -> Bool 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.hasAttrByPath"} -->

Determine if an attribute exists within a nested attribute set.

### Parameters

#### attrPath

A list of strings representing the path through the nested attribute set `set`.

#### set

The nested attributeset to check.

### Examples

#### A nested value does exist inside a set

```nix
lib.attrsets.hasAttrByPath
  [ "a" "b" "c" "d" ]
  { a = { b = { c = { d = 123; }; }; }; }
```

```nix
true
```

## `lib.attrsets.setAttrByPath`

```hs nix
setAttrByPath :: [String] -> Any -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.setAttrByPath"} -->

Create a new attribute set with `value` set at the nested attribute location specified in `attrPath`.

### Parameters

#### attrPath

A list of strings representing the path through the nested attribute set.

#### value

The value to set at the location described by `attrPath`.

### Examples

#### Creating a new nested attribute set

```nix
lib.attrsets.setAttrByPath [ "a" "b" ] 3
```

```nix
{ a = { b = 3; }; }
```

## `lib.attrsets.getAttrFromPath`

```hs nix
getAttrFromPath :: [String] -> AttrSet -> Value 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.getAttrFromPath"} -->

Like except without a default, and it will throw if the value doesn't exist.

### Parameters

#### attrPath

A list of strings representing the path through the nested attribute set `set`.

#### set

The nested attribute set to find the value in.

### Examples

#### Succesfully getting a value from an attribute set

```nix
lib.attrsets.getAttrFromPath [ "a" "b" ] { a = { b = 3; }; }
```

```nix
3
```

#### Throwing after failing to get a value from an attribute set

```nix
lib.attrsets.getAttrFromPath [ "x" "y" ] { }
```

```nix
error: cannot find attribute `x.y'
```

## `lib.attrsets.attrVals`

```hs nix
attrVals :: [String] -> AttrSet -> [Any] 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.attrVals"} -->

Return the specified attributes from a set. All values must exist.

### Parameters

#### nameList

The list of attributes to fetch from `set`. Each attribute name must exist on the attrbitue set.

#### set

The set to get attribute values from.

### Examples

#### Getting several values from an attribute set

```nix
lib.attrsets.attrVals [ "a" "b" "c" ] { a = 1; b = 2; c = 3; }
```

```nix
[ 1 2 3 ]
```

#### Getting missing values from an attribute set

```nix
lib.attrsets.attrVals [ "d" ] { }
error: attribute 'd' missing
```

## `lib.attrsets.attrValues`

```hs nix
attrValues :: AttrSet -> [Any] 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.attrValues"} -->

Get all the attribute values from an attribute set.

Provides a backwards-compatible interface of `builtins.attrValues` for Nix version older than 1.8.

### Parameters

#### attrs

The attribute set.

### Examples

####

```nix
lib.attrsets.attrValues { a = 1; b = 2; c = 3; }
```

```nix
[ 1 2 3 ]
```

## `lib.attrsets.catAttrs`

```hs nix
catAttrs :: String -> [AttrSet] -> [Any] 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.catAttrs"} -->

Collect each attribute named \`attr' from the list of attribute sets, `sets`. Sets that don't contain the named attribute are ignored.

Provides a backwards-compatible interface of `builtins.catAttrs` for Nix version older than 1.9.

### Parameters

#### attr

Attribute name to select from each attribute set in `sets`.

#### sets

The list of attribute sets to select `attr` from.

### Examples

#### Collect an attribute from a list of attribute sets.

```nix
catAttrs "a" [{a = 1;} {b = 0;} {a = 2;}]
```

```nix
[ 1 2 ]
```

## `lib.attrsets.filterAttrs`

```hs nix
filterAttrs :: (String -> Any -> Bool) -> AttrSet -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.filterAttrs"} -->

Filter an attribute set by removing all attributes for which the given predicate return false.

### Parameters

#### pred

String -> Any -> Bool

Predicate which returns true to include an attribute, or returns false to exclude it.

`name` The attribute's name`value` The attribute's value

Returns true to include the attribute, false to exclude the attribute.

#### set

The attribute set to filter

### Examples

#### Filtering an attributeset

```nix
filterAttrs (n: v: n == "foo") { foo = 1; bar = 2; }
```

```nix
{ foo = 1; }
```

## `lib.attrsets.filterAttrsRecursive`

```hs nix
filterAttrsRecursive :: (String -> Any -> Bool) -> AttrSet -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.filterAttrsRecursive"} -->

Filter an attribute set recursively by removing all attributes for which the given predicate return false.

### Parameters

#### pred

String -> Any -> Bool

Predicate which returns true to include an attribute, or returns false to exclude it.

`name` The attribute's name`value` The attribute's value

Returns true to include the attribute, false to exclude the attribute.

#### set

The attribute set to filter

### Examples

#### Recursively filtering an attribute set

```nix
lib.attrsets.filterAttrsRecursive
  (n: v: v != null)
  {
    levelA = {
      example = "hi";
      levelB = {
        hello = "there";
        this-one-is-present = {
          this-is-excluded = null;
        };
      };
      this-one-is-also-excluded = null;
    };
    also-excluded = null;
  }
```

```nix
{
     levelA = {
       example = "hi";
       levelB = {
         hello = "there";
         this-one-is-present = { };
       };
     };
   }
```

## `lib.attrsets.foldAttrs`

```hs nix
foldAttrs :: (Any -> Any -> Any) -> Any -> [AttrSets] -> Any 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.foldAttrs"} -->

Apply fold function to values grouped by key.

### Parameters

#### op

Any -> Any -> Any

Given a value `val` and a collector `col`, combine the two.

`val` An attribute's value`col` <!-- TODO: make this not bad, use more fold-ey terms -->The result of previous `op` calls with other values and `nul`.

#### nul

The null-value, the starting value.

#### list\_of\_attrs

A list of attribute sets to fold together by key.

### Examples

#### Combining an attribute of lists in to one attribute set

```nix
lib.attrsets.foldAttrs
  (n: a: [n] ++ a) []
  [
    { a = 2; b = 7; }
    { a = 3; }
    { b = 6; }
  ]
```

```nix
{ a = [ 2 3 ]; b = [ 7 6 ]; }
```

## `lib.attrsets.collect`

```hs nix
collect :: (Any -> Bool) -> AttrSet -> [Any] 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.collect"} -->

Recursively collect sets that verify a given predicate named `pred` from the set `attrs`. The recursion stops when `pred` returns true.

### Parameters

#### pred

Any -> Bool

Given an attribute's value, determine if recursion should stop.

`value` The attribute set value.

#### attrs

The attribute set to recursively collect.

### Examples

#### Collecting all lists from an attribute set

```nix
lib.attrsets.collect isList { a = { b = ["b"]; }; c = [1]; }
```

```nix
[["b"] [1]]
```

#### Collecting all attribute-sets which contain the outPath attribute name.

```nix
collect (x: x ? outPath)
  { a = { outPath = "a/"; }; b = { outPath = "b/"; }; }
```

```nix
[{ outPath = "a/"; } { outPath = "b/"; }]
```

## `lib.attrsets.nameValuePair`

```hs nix
nameValuePair :: String -> Any -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.nameValuePair"} -->

Utility function that creates a {name, value} pair as expected by `builtins.listToAttrs`.

### Parameters

#### name

The attribute name.

#### value

The attribute value.

### Examples

#### Creating a name value pair

```nix
nameValuePair "some" 6
```

```nix
{ name = "some"; value = 6; }
```

## `lib.attrsets.mapAttrs`

```hs nix
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.mapAttrs"} -->

Apply a function to each element in an attribute set, creating a new attribute set.

Provides a backwards-compatible interface of `builtins.mapAttrs` for Nix version older than 2.1.

### Parameters

#### fn

String -> Any -> Any

Given an attribute's name and value, return a new value.

`name` The name of the attribute.`value` The attribute's value.

### Examples

#### Modifying each value of an attribute set

```nix
lib.attrsets.mapAttrs
  (name: value: name + "-" + value)
  { x = "foo"; y = "bar"; }
```

```nix
{ x = "x-foo"; y = "y-bar"; }
```

## `lib.attrsets.mapAttrs'`

```hs nix
mapAttrs' :: (String -> Any -> { name = String; value = Any }) -> AttrSet -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.mapAttrs-prime"} -->

Like `mapAttrs`, but allows the name of each attribute to be changed in addition to the value. The applied function should return both the new name and value as a `nameValuePair`.

### Parameters

#### fn

String -> Any -> { name = String; value = Any }

Given an attribute's name and value, return a new .

`name` The name of the attribute.`value` The attribute's value.

#### set

The attribute set to map over.

### Examples

#### Change the name and value of each attribute of an attribute set

```nix
lib.attrsets.mapAttrs' (name: value: lib.attrsets.nameValuePair ("foo_" + name) ("bar-" + value))
   { x = "a"; y = "b"; }
```

```nix
{ foo_x = "bar-a"; foo_y = "bar-b"; }
```

## `lib.attrsets.mapAttrsToList`

```hs nix
mapAttrsToList :: (String -> Any -> Any) -> AttrSet -> [Any] 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.mapAttrsToList"} -->

Call `fn` for each attribute in the given `set` and return the result in a list.

### Parameters

#### fn

String -> Any -> Any

Given an attribute's name and value, return a new value.

`name` The name of the attribute.`value` The attribute's value.

#### set

The attribute set to map over.

### Examples

#### Combine attribute values and names in to a list

```nix
lib.attrsets.mapAttrsToList (name: value: "${name}=${value}")
   { x = "a"; y = "b"; }
```

```nix
[ "x=a" "y=b" ]
```

## `lib.attrsets.mapAttrsRecursive`

```hs nix
mapAttrsRecursive :: ([String] > Any -> Any) -> AttrSet -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.mapAttrsRecursive"} -->

Like `mapAttrs`, except that it recursively applies itself to attribute sets. Also, the first argument of the argument function is a list of the names of the containing attributes.

### Parameters

#### f

\[ String ] -> Any -> Any

Given a list of attribute names and value, return a new value.

`name_path` The list of attribute names to this value.For example, the `name_path` for the example string in the attribute set { foo = { bar = "example"; }; } is \[ "foo" "bar" ].`value` The attribute's value.

#### set

The attribute set to recursively map over.

### Examples

#### A contrived example of using `lib.attrsets.mapAttrsRecursive`

```nix
mapAttrsRecursive
  (path: value: concatStringsSep "-" (path ++ [value]))
  {
    n = {
      a = "A";
      m = {
        b = "B";
        c = "C";
      };
    };
    d = "D";
  }
```

```nix
{
     n = {
       a = "n-a-A";
       m = {
         b = "n-m-b-B";
         c = "n-m-c-C";
       };
     };
     d = "d-D";
   }
```

## `lib.attrsets.mapAttrsRecursiveCond`

```hs nix
mapAttrsRecursiveCond :: (AttrSet -> Bool) -> ([ String ] -> Any -> Any) -> AttrSet -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.mapAttrsRecursiveCond"} -->

Like `mapAttrsRecursive`, but it takes an additional predicate function that tells it whether to recursive into an attribute set. If it returns false, `mapAttrsRecursiveCond` does not recurse, but does apply the map function. It is returns true, it does recurse, and does not apply the map function.

### Parameters

#### cond

(AttrSet -> Bool)

Determine if `mapAttrsRecursive` should recurse deeper in to the attribute set.

`attributeset` An attribute set.

#### f

\[ String ] -> Any -> Any

Given a list of attribute names and value, return a new value.

`name_path` The list of attribute names to this value.For example, the `name_path` for the example string in the attribute set { foo = { bar = "example"; }; } is \[ "foo" "bar" ].`value` The attribute's value.

#### set

The attribute set to recursively map over.

### Examples

#### Only convert attribute values to JSON if the containing attribute set is marked for recursion

```nix
lib.attrsets.mapAttrsRecursiveCond
  ({ recurse ? false, ... }: recurse)
  (name: value: builtins.toJSON value)
  {
    dorecur = {
      recurse = true;
      hello = "there";
    };
    dontrecur = {
      converted-to- = "json";
    };
  }
```

```nix
{
     dorecur = {
       hello = "\"there\"";
       recurse = "true";
     };
     dontrecur = "{\"converted-to\":\"json\"}";
   }
```

## `lib.attrsets.genAttrs`

```hs nix
genAttrs :: [ String ] -> (String -> Any) -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.genAttrs"} -->

Generate an attribute set by mapping a function over a list of attribute names.

### Parameters

#### names

Names of values in the resulting attribute set.

#### f

String -> Any

Takes the name of the attribute and return the attribute's value.

`name` The name of the attribute to generate a value for.

### Examples

#### Generate an attrset based on names only

```nix
lib.attrsets.genAttrs [ "foo" "bar" ] (name: "x_${name}")
```

```nix
{ foo = "x_foo"; bar = "x_bar"; }
```

## `lib.attrsets.isDerivation`

```hs nix
isDerivation :: Any -> Bool 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.isDerivation"} -->

Check whether the argument is a derivation. Any set with `{ type = "derivation"; }` counts as a derivation.

### Parameters

#### value

The value which is possibly a derivation.

### Examples

#### A package is a derivation

```nix
lib.attrsets.isDerivation (import <nixpkgs> {}).ruby
```

```nix
true
```

#### Anything else is not a derivation

```nix
lib.attrsets.isDerivation "foobar"
```

```nix
false
```

## `lib.attrsets.toDerivation`

```hs nix
toDerivation :: Path -> Derivation 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.toDerivation"} -->

Converts a store path to a fake derivation.

### Parameters

#### path

A store path to convert to a derivation.

## `lib.attrsets.optionalAttrs`

```hs nix
optionalAttrs :: Bool -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.optionalAttrs"} -->

Conditionally return an attribute set or an empty attribute set.

### Parameters

#### cond

Condition under which the `as` attribute set is returned.

#### as

The attribute set to return if `cond` is true.

### Examples

#### Return the provided attribute set when `cond` is true

```nix
lib.attrsets.optionalAttrs true { my = "set"; }
```

```nix
{ my = "set"; }
```

#### Return an empty attribute set when `cond` is false

```nix
lib.attrsets.optionalAttrs false { my = "set"; }
```

```nix
{ }
```

## `lib.attrsets.zipAttrsWithNames`

```hs nix
zipAttrsWithNames :: [ String ] -> (String -> [ Any ] -> Any) -> [ AttrSet ] -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.zipAttrsWithNames"} -->

Merge sets of attributes and use the function `f` to merge attribute values where the attribute name is in `names`.

### Parameters

#### names

A list of attribute names to zip.

#### f

(String -> \[ Any ] -> Any

Accepts an attribute name, all the values, and returns a combined value.

`name` The name of the attribute each value came from.`vs` A list of values collected from the list of attribute sets.

#### sets

A list of attribute sets to zip together.

### Examples

#### Summing a list of attribute sets of numbers

```nix
lib.attrsets.zipAttrsWithNames
  [ "a" "b" ]
  (name: vals: "${name} ${toString (builtins.foldl' (a: b: a + b) 0 vals)}")
  [
    { a = 1; b = 1; c = 1; }
    { a = 10; }
    { b = 100; }
    { c = 1000; }
  ]
```

```nix
{ a = "a 11"; b = "b 101"; }
```

## `lib.attrsets.zipAttrsWith`

```hs nix
zipAttrsWith :: (String -> [ Any ] -> Any) -> [ AttrSet ] -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.zipAttrsWith"} -->

Merge sets of attributes and use the function `f` to merge attribute values. Similar to where all key names are passed for `names`.

### Parameters

#### f

(String -> \[ Any ] -> Any

Accepts an attribute name, all the values, and returns a combined value.

`name` The name of the attribute each value came from.`vs` A list of values collected from the list of attribute sets.

#### sets

A list of attribute sets to zip together.

### Examples

#### Summing a list of attribute sets of numbers

```nix
lib.attrsets.zipAttrsWith
  (name: vals: "${name} ${toString (builtins.foldl' (a: b: a + b) 0 vals)}")
  [
    { a = 1; b = 1; c = 1; }
    { a = 10; }
    { b = 100; }
    { c = 1000; }
  ]
```

```nix
{ a = "a 11"; b = "b 101"; c = "c 1001"; }
```

## `lib.attrsets.zipAttrs`

```hs nix
zipAttrs :: [ AttrSet ] -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.zipAttrs"} -->

Merge sets of attributes and combine each attribute value in to a list. Similar to where the merge function returns a list of all values.

### Parameters

#### sets

A list of attribute sets to zip together.

### Examples

#### Combining a list of attribute sets

```nix
lib.attrsets.zipAttrs
  [
    { a = 1; b = 1; c = 1; }
    { a = 10; }
    { b = 100; }
    { c = 1000; }
  ]
```

```nix
{ a = [ 1 10 ]; b = [ 1 100 ]; c = [ 1 1000 ]; }
```

## `lib.attrsets.recursiveUpdateUntil`

```hs nix
recursiveUpdateUntil :: ( [ String ] -> AttrSet -> AttrSet -> Bool ) -> AttrSet -> AttrSet -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.recursiveUpdateUntil"} -->

Does the same as the update operator // except that attributes are merged until the given predicate is verified. The predicate should accept 3 arguments which are the path to reach the attribute, a part of the first attribute set and a part of the second attribute set. When the predicate is verified, the value of the first attribute set is replaced by the value of the second attribute set.

### Parameters

#### pred

\[ String ] -> AttrSet -> AttrSet -> Bool

`path` The path to the values in the left and right hand sides.`l` The left hand side value.`r` The right hand side value.

#### lhs

The left hand attribute set of the merge.

#### rhs

The right hand attribute set of the merge.

### Examples

#### Recursively merging two attribute sets

```nix
lib.attrsets.recursiveUpdateUntil (path: l: r: path == ["foo"])
  {
    # first attribute set
    foo.bar = 1;
    foo.baz = 2;
    bar = 3;
  }
  {
    #second attribute set
    foo.bar = 1;
    foo.quz = 2;
    baz = 4;
  }
```

```nix
{
  foo.bar = 1; # 'foo.*' from the second set
  foo.quz = 2; #
  bar = 3;     # 'bar' from the first set
  baz = 4;     # 'baz' from the second set
}
```

## `lib.attrsets.recursiveUpdate`

```hs nix
recursiveUpdate :: AttrSet -> AttrSet -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.recursiveUpdate"} -->

A recursive variant of the update operator //. The recursion stops when one of the attribute values is not an attribute set, in which case the right hand side value takes precedence over the left hand side value.

### Parameters

#### lhs

The left hand attribute set of the merge.

#### rhs

The right hand attribute set of the merge.

### Examples

#### Recursively merging two attribute sets

```nix
recursiveUpdate
  {
    boot.loader.grub.enable = true;
    boot.loader.grub.device = "/dev/hda";
  }
  {
    boot.loader.grub.device = "";
  }
```

```nix
{
  boot.loader.grub.enable = true;
  boot.loader.grub.device = "";
}
```

## `lib.attrsets.recurseIntoAttrs`

```hs nix
recurseIntoAttrs :: AttrSet -> AttrSet 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.recurseIntoAttrs"} -->

Make various Nix tools consider the contents of the resulting attribute set when looking for what to build, find, etc.

This function only affects a single attribute set; it does not apply itself recursively for nested attribute sets.

### Parameters

#### attrs

An attribute set to scan for derivations.

### Examples

#### Making Nix look inside an attribute set

```nix
{ pkgs ? import <nixpkgs> {} }:
{
  myTools = pkgs.lib.recurseIntoAttrs {
    inherit (pkgs) hello figlet;
  };
}
```

## `lib.attrsets.cartesianProductOfSets`

```hs nix
cartesianProductOfSets :: AttrSet -> [ AttrSet ] 
```

<!-- TODO include {"href":"./locations.xml","xpointer":"lib.attrsets.cartesianProductOfSets"} -->

Return the cartesian product of attribute set value combinations.

### Parameters

#### set

An attribute set with attributes that carry lists of values.

### Examples

#### Creating the cartesian product of a list of attribute values

```nix
cartesianProductOfSets { a = [ 1 2 ]; b = [ 10 20 ]; }
```

```nix
[
     { a = 1; b = 10; }
     { a = 1; b = 20; }
     { a = 2; b = 10; }
     { a = 2; b = 20; }
   ]
```
