# Deesontech Website - Production Deployment Guide for AlmaLinux 9

This guide outlines the steps to deploy the Deesontech website (React + Vite frontend, Express + PostgreSQL backend) to a production environment running AlmaLinux 9.

## 1. Prerequisites
- A server running **AlmaLinux 9**.
- A user account with `sudo` privileges.
- A domain name pointing to your server's IP address (e.g., `deesontech.com`).
- SSH access to the server.

## 2. System Update and Basic Tools
First, ensure your system is up-to-date and install essential tools.
```bash
sudo dnf update -y
sudo dnf install -y git curl wget vim epel-release
```

## 3. Install Node.js
We will install Node.js (LTS version 20) via NodeSource.
```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
node -v # Verify installation
npm -v  # Verify npm
```

## 4. Install PostgreSQL
The backend uses PostgreSQL. We will install it from the default AlmaLinux repositories.
```bash
sudo dnf install -y postgresql-server postgresql-contrib
sudo postgresql-setup --initdb
sudo systemctl enable --now postgresql
```

### Create Database and User
Log in as the `postgres` user to set up the database:
```bash
sudo -i -u postgres
psql
```
Inside the `psql` prompt, run the following (replace `your_secure_password` with a strong password):
```sql
CREATE DATABASE deesontech_db;
CREATE USER deesontech_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE deesontech_db TO deesontech_user;
\q
```
Exit the postgres user session:
```bash
exit
```

## 5. Clone the Repository
Choose a directory for your application, typically `/var/www/`.
```bash
sudo mkdir -p /var/www/deesontech
sudo chown -R $USER:$USER /var/www/deesontech
cd /var/www/deesontech
git clone https://github.com/netlinexindia-hash/Deesontech_website.git .
```

## 6. Configure and Build the Backend (Server)
```bash
cd /var/www/deesontech/server
npm install
```

Create a `.env` file for production:
```bash
cat <<EOF > .env
PORT=5000
DATABASE_URL=postgres://deesontech_user:your_secure_password@localhost:5432/deesontech_db
NODE_ENV=production
# Add any other required environment variables here
EOF
```

Build the TypeScript code:
```bash
npm run build
```

Install PM2 to run the backend application as a background service:
```bash
sudo npm install -g pm2
pm2 start dist/server.js --name "deesontech-api"
pm2 save
pm2 startup
# Note: Run the command that pm2 startup outputs to enable it on boot
```

## 7. Configure and Build the Frontend (Client)
```bash
cd /var/www/deesontech/client
npm install
```

Build the frontend for production:
```bash
npm run build
```
The built static files will be located in `/var/www/deesontech/client/dist`.

## 8. Install and Configure Nginx
Nginx will serve the frontend static files and reverse proxy API requests to the backend.
```bash
sudo dnf install -y nginx
sudo systemctl enable --now nginx
```

Create an Nginx configuration file for your domain:
```bash
sudo vim /etc/nginx/conf.d/deesontech.conf
```

Add the following configuration (replace `deesontech.com` with your actual domain):
```nginx
server {
    listen 80;
    server_name deesontech.com www.deesontech.com;

    # Serve Frontend static files
    location / {
        root /var/www/deesontech/client/dist;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Reverse Proxy Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SELinux Configuration for Nginx
Since AlmaLinux uses SELinux by default, you must allow Nginx to connect to the network (for the proxy to work) and read the frontend files.
```bash
sudo setsebool -P httpd_can_network_connect 1
sudo chcon -Rt httpd_sys_content_t /var/www/deesontech/client/dist
```

Check the Nginx configuration for syntax errors and reload:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 9. Configure Firewall (Firewalld)
Allow HTTP and HTTPS traffic through the firewall.
```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## 10. Secure with SSL (Let's Encrypt)
Install Certbot for Nginx to enable HTTPS.
```bash
sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d deesontech.com -d www.deesontech.com
```
Follow the interactive prompts to configure HTTPS. Certbot will automatically update your Nginx configuration to force HTTPS and set up auto-renewal for the certificate.

> [!TIP]
> **Maintenance and Updates**
> To deploy future updates, you can run the following commands:
> ```bash
> cd /var/www/deesontech
> git pull origin main
> 
> # Update backend
> cd server && npm install && npm run build
> pm2 restart deesontech-api
> 
> # Update frontend
> cd ../client && npm install && npm run build
> ```
