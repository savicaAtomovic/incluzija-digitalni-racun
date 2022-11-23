 component_name="acc-za-djecu-web"

PACKAGE_VERSION=$(cat ../package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | awk '{$1=$1};1')

echo "Building" $PACKAGE_VERSION "..."

component_version=$PACKAGE_VERSION
 
docker build --platform="linux/amd64" -f Dockerfile -t savicat/$component_name:$component_version ..

