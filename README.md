# Movie Management Project

```
このリポジトリは、映画管理システムの開発環境構築用ガイドを提供します。以下の手順に従って、環境を構築してください。
```

## **環境構築手順**

```
---
```

### **1. プロジェクトディレクトリを作成**

```
mkdir ~/teamProject/movie_management
cd ~/teamProject/movie_management
```

```
---
```

### **2. 必要なファイルを作成**

```
touch Dockerfile docker-compose.yml requirements.txt .env
```

```
---
```

### **3. Dockerfile の内容を記載**

```
FROM python:3.9-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    && apt-get clean

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

```
---
```

### **4. docker-compose.yml の内容を記載**

```
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    depends_on:
      - db
    environment:
      - DATABASE_URL=mysql://user:password@db:3306/moviedb

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: moviedb
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
```

```
---
```

### **5. requirements.txt の内容を記載**

```
django
mysqlclient
```

```
---
```

### **6. .env ファイルの内容を記載**

```
DATABASE_URL=mysql://user:password@db:3306/moviedb
```

```
---
```

### **7. Dockerイメージをビルド**

```
docker-compose build
```

```
---
```

### **8. Djangoプロジェクトを作成**

```
docker-compose run web django-admin startproject movie_management .
```

```
---
```

### **9. コンテナを起動**

```
docker-compose up
```

```
---
```

### **10. Djangoのマイグレーション**

```
docker-compose exec web python manage.py migrate
```

```
---
```

### **11. 管理者ユーザーを作成**

```
docker-compose exec web python manage.py createsuperuser
```

```
---
```

### **12. 動作確認**

```
ブラウザで以下のURLにアクセスして、Djangoの初期画面が表示されることを確認してください。

http://localhost:8000
```

```
---
```

### **13. プロジェクトの停止**

```
docker-compose down
```

```
---
```

## **トラブルシューティング**

```
1. **ポート競合エラーが発生した場合**
   - 確認コマンド:
     docker ps

   - 問題のあるコンテナを停止:
     docker stop <CONTAINER_ID>

2. **`manage.py already exists` エラー**
   - プロジェクトディレクトリに既存ファイルがある場合、削除またはスキップしてください。
```

```
---
```

## **必要条件**

```
- Docker と Docker Compose がインストールされていること。
- Python 3.9 をベースとした環境で動作することを確認済み。
```
