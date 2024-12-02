FROM python:3.9-slim

# 作業ディレクトリ
WORKDIR /app

# 必要なシステムパッケージをインストール
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    && apt-get clean

# Pythonライブラリをインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコピー
COPY . .

# ポートを指定
EXPOSE 8000

# アプリケーションの起動コマンド
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
