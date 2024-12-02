# Movie Management Project

```
このリポジトリは、映画管理システムの開発環境構築用ガイドを提供します。以下の手順に従って、環境を構築してください。
```

## **環境構築手順**

### **1. プロジェクトディレクトリを作成**

```
mkdir ~/teamProject/movie_management
cd ~/teamProject/movie_management
```


### **2. .env ファイルの内容を記載**

```
DATABASE_URL=mysql://user:password@db:3306/moviedb
```


### **3. Dockerイメージをビルド**

```
docker-compose build
```


### **4. コンテナを起動**

```
docker-compose up
```


### **5. Djangoのマイグレーション**

```
docker-compose exec web python manage.py migrate
```



### **6. 管理者ユーザーを作成**

```
docker-compose exec web python manage.py createsuperuser
```



### **7. 動作確認**

```
ブラウザで以下のURLにアクセスして、Djangoの初期画面が表示されることを確認してください。

http://localhost:8000
```



### **8. プロジェクトの停止**

```
docker-compose down
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



## **必要条件**

```
- Docker と Docker Compose がインストールされていること。
- Python 3.9 をベースとした環境で動作することを確認済み。
```
