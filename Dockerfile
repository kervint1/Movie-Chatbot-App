FROM python:3.9-slim

# 作業ディレクトリ
WORKDIR /app

# 必要なシステムパッケージをインストール
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    libssl-dev \
    netcat-openbsd \
    && apt-get clean

# Pythonライブラリをインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# cryptography パッケージをインストール
RUN pip install --no-cache-dir cryptography

# アプリケーションコードをコピー
COPY . .

# ポートを指定
EXPOSE 8000

# アプリケーションの起動コマンド (MySQLを待機)
CMD ["sh", "-c", "until nc -z db 3306; do echo 'Waiting for MySQL...'; sleep 2; done; python manage.py runserver 0.0.0.0:8000"]
