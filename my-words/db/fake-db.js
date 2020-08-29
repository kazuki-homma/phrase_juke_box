const Word = require('../model/product');

class FakeDb {
    constructor() {
        this.words = [
            {
                word: '自分自身を信じてみるだけでいい。きっと、生きる道が見えてくる。',
                description: '',
                author: 'ゲーテ(ドイツの詩人)',
                category: 'famous quote',
            },
            {
                word: '運がいい人も、運が悪い人もいない。運がいいと思う人と、運が悪いと思う人がいるだけだ。',
                description: '',
                author: '中谷彰宏',
                category: 'famous quote',
            },
            {
                word: '樹木にとって最も大切なものは何かと問うたら、それは果実だと誰もが答えるだろう。しかし実際には種なのだ。',
                description: '',
                author: 'ニーチェ',
                category: 'famous quote',
            },
            {
                word: '人生という試合で最も重要なのは、休憩時間の得点である。',
                description: '',
                author: 'ナポレオン・ボナパルト',
                category: 'famous quote',
            },
            {
                word: '人生に失敗がないと、人生を失敗する。',
                description: '',
                author: '斎藤茂太',
                category: 'famous quote',
            },
            {
                word: '人生はむつかしく解釈するから分からなくなる。',
                description: '',
                author: '武者小路実篤',
                category: 'famous quote',
            },
        ]
    }

    async initDB () {
        await this.cleanDB();
        this.pushWordsToDB();
    }

    async cleanDB() {
        await Word.deleteMany({});
    }

    pushWordsToDB() {
        this.words.forEach(
            (word) => {
                const newWord = new Word(word);
                newWord.save();
            }
        )
    }
}

module.exports = FakeDb;