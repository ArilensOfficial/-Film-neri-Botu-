const { Client, GatewayIntentBits, Events, REST, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('./config.js');
const fetch = require('node-fetch');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once(Events.ClientReady, () => {
    console.log(`Giriş yapıldı: ${client.user.tag}`);
});

// Film öneri komutu
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'film_oner') {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${config.api_key}&language=en-US&page=1`);
        const data = await response.json();
        const randomFilm = data.results[Math.floor(Math.random() * data.results.length)];
        
        const embed = {
            title: randomFilm.title,
            description: randomFilm.overview,
            fields: [
                { name: 'Yayın Tarihi', value: randomFilm.release_date || 'Bilgi yok' },
                { name: 'Oylama', value: randomFilm.vote_average.toString() || 'Bilgi yok' },
            ],
            image: { url: `https://image.tmdb.org/t/p/w500${randomFilm.poster_path}` },
            footer: { text: 'Film önerisi' },
        };
        
        await interaction.reply({ embeds: [embed] });
    }

    if (commandName === 'film_ara') {
        const filmAdi = interaction.options.getString('adi');
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${config.api_key}&query=${encodeURIComponent(filmAdi)}`);
        const data = await response.json();
        
        if (data.results.length === 0) {
            await interaction.reply('Film bulunamadı.');
            return;
        }

        const film = data.results[0]; // İlk sonucu alıyoruz
        
        const embed = {
            title: film.title,
            description: film.overview,
            fields: [
                { name: 'Yayın Tarihi', value: film.release_date || 'Bilgi yok' },
                { name: 'Oylama', value: film.vote_average.toString() || 'Bilgi yok' },
                { name: 'Oyuncular', value: 'Henüz bilgi yok.' }, // Bunu daha sonra detaylandırabiliriz.
            ],
            image: { url: `https://image.tmdb.org/t/p/w500${film.poster_path}` },
            footer: { text: 'Film bilgisi' },
        };

        const button = new ButtonBuilder()
            .setCustomId('film_detay')
            .setLabel('Detayları Göster')
            .setStyle(ButtonStyle.Primary);
        
        const row = new ActionRowBuilder().addComponents(button);

        await interaction.reply({ embeds: [embed], components: [row] });
    }
});

// Film detayları butonuna tıklama
client.on('interactionCreate', async (interaction) => {
    if (interaction.customId === 'film_detay') {
        // Buraya film detaylarını almak için API çağrısı yapılabilir
        await interaction.reply('Bu özellik henüz geliştirilmedi.');
    }
});

// Komutları kaydet
const rest = new REST({ version: '9' }).setToken(config.bot_token);
(async () => {
    try {
        console.log('Başlatılıyor...');

        await rest.put(Routes.applicationCommands(config.client_id), {
            body: [
                {
                    name: 'film_oner',
                    description: 'Rastgele bir film önerir.',
                },
                {
                    name: 'film_ara',
                    description: 'Bir film arar.',
                    options: [{
                        name: 'adi',
                        type: 3, // STRING
                        description: 'Aramak istediğiniz filmin adı',
                        required: true,
                    }],
                },
            ],
        });

        console.log('Komutlar başarıyla kaydedildi.');
    } catch (error) {
        console.error(error);
    }
})();

// Botu çalıştır
client.login(config.bot_token);