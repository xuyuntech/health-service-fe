all: push

container:
	docker build -t registry.cn-beijing.aliyuncs.com/cabernety/health-service-fe:latest .
push: container
	docker push registry.cn-beijing.aliyuncs.com/cabernety/health-service-fe:latest