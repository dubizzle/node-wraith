DEFAULT_DOCKER_IMAGE_NAME=dubizzledotcom/node_wraith
DEFAULT_DOCKER_IMAGE_VERSION=0.01
SHELL=/bin/bash
GIT_BRANCH = $(shell git symbolic-ref --short -q HEAD)

.PHONY: docker

docker:
	rm -rf docker/archive.tar.gz docker/node-wraith
	mkdir docker/node-wraith
	git archive --format tar.gz --output docker/archive.tar.gz $(GIT_BRANCH)
	docker build -t $${IMAGE_NAME:-$(DEFAULT_DOCKER_IMAGE_NAME)}:$${IMAGE_VERSION:-$(DEFAULT_DOCKER_IMAGE_VERSION)} docker
	#rm -rf docker/archive.tar.gz docker/node-wraith
