#! /bin/sh

# fix:
# $ git push milahu -u main
#  ! [remote rejected] main -> main (shallow update not allowed)
# error: failed to push some refs to 'https://github.com/milahu/unifiedjs-docbook'

# https://gist.github.com/gobinathm/96e27a588bb447154604963e09c38ddc

for r in $(git remote show)
do
  [[ "$r" == "milahu" ]] && continue
  [[ "$r" == "origin" ]] && continue
  [[ "$r" == "upstream" ]] && continue
  echo $r
  (
    set -x
    git fetch --unshallow $r main --no-tags
  )
done
