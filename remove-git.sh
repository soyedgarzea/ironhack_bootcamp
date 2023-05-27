for f in */ ; do
    cd "$f"
    rm -rf .git
    cd "starter-code"
    rm -rf ./node_modules
    cd ../..
done
