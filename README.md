# 🎥 Film Öneri Botu

Bu proje, Discord için geliştirilmiş bir film öneri botudur. Kullanıcılar, bot ile emojili komutlar kullanarak film önerileri alabilir ve film arama işlemleri yapabilir. **Slash komutlarını destekler.**

## 📜 Komutlar

Bot, aşağıdaki komutları desteklemektedir:

1. **/film_oner** - Rastgele bir film önerir.
2. **/film_ara <adi>** - Belirtilen film adını arar ve detaylarını gösterir.

## ⚙️ Gereksinimler

Bu botu çalıştırmak için aşağıdaki kütüphanelerin yüklenmesi gerekmektedir:

- **discord.js**: Discord API ile etkileşim için.
- **node-fetch**: API istekleri yapmak için.

## 🛠️ Kurulum

1. Projeyi klonlayın veya indirin.
2. Terminalden proje dizinine gidin.
3. Gerekli kütüphaneleri yüklemek için şu komutu çalıştırın:

   ```bash
   npm install

4. config.js dosyasını oluşturun ve API anahtarınızı ve bot tokeninizi buraya ekleyin:

module.exports = {
    api_key: 'YOUR_API_KEY',
    bot_token: 'YOUR_BOT_TOKEN',
    client_id: 'YOUR_CLIENT_ID',
};



# ⚠️ Dikkat

config.js dosyası gereklidir. Kendi token ve API anahtarınızı kullanmak için yukarıdaki adımları izleyin.

# 🌐 Kullanılan API

Bu bot, The Movie Database (TMDb) API'sini kullanmaktadır. API'den film verilerini almak için bir API anahtarına ihtiyacınız vardır.

# 🤝 Katkıda Bulunanlar

ArilensOfficial


# 📧 İletişim

Herhangi bir sorunuz veya öneriniz varsa, benimle Discord üzerinden iletişime geçebilirsiniz: arilensofficial
