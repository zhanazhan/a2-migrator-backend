# Deployment

### Commands
```
sudo dnf module reset nodejs
sudo dnf module list nodejs
sudo dnf module enable nodejs:22
sudo dnf install nodejs
node --version
yum install -y unzip
mkdir -p /opt/agent/data
chown backend:backend /opt/agent/ -R
unzip a2-agent-backend.zip -d /opt/agent
cd /opt/agent/
npm i
npm run start:prod
cd ..
mkdir data
chown backend:backend /opt/data/ -R
pwd
cd agent/
pwd
sudo vi /etc/systemd/system/agent.service
chown backend:backend /opt/data/ -R
systemctl daemon-reload
```

### Install as a Service

- Create service init file
```
sudo vi /etc/systemd/system/agent.service
```

- Insert this content:
```
[Unit]
After=network.target

[Service]
Type=simple
User=backend
ExecStart=/usr/bin/npm run start:prod
Restart=on-failure
WorkingDirectory=/opt/agent
RestartSec=60

[Install]
WantedBy=multi-user.target
```
