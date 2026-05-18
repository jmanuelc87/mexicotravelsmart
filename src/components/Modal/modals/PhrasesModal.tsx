'use client';

import { useLocale } from 'next-intl';
import { useModal } from '../ModalContext';
import styles from './PhrasesModal.module.css';

interface Phrase {
  es: string;
  trans: string;
  pron: string;
}

const PHRASES: Record<string, Phrase[]> = {
  en: [
    { es: '¡Hola!', trans: 'Hello!', pron: 'OH-lah' },
    { es: 'Buenos días', trans: 'Good morning', pron: 'BWEH-nos DEE-as' },
    { es: '¿Cuánto cuesta?', trans: 'How much does it cost?', pron: 'KWAHN-toh KWES-tah' },
    { es: 'La cuenta, por favor', trans: 'The check, please', pron: 'lah KWEN-tah por fah-VOR' },
    {
      es: '¿Dónde está el baño?',
      trans: 'Where is the bathroom?',
      pron: 'DON-deh es-TAH el BAH-nyoh',
    },
    { es: 'Un taxi, por favor', trans: 'A taxi, please', pron: 'oon TAK-see por fah-VOR' },
    { es: 'Gracias', trans: 'Thank you', pron: 'GRAH-see-as' },
    { es: 'No entiendo', trans: "I don't understand", pron: 'noh en-TYEN-doh' },
    { es: '¿Habla inglés?', trans: 'Do you speak English?', pron: 'AH-blah een-GLES' },
    { es: '¡Salud!', trans: 'Cheers! / Bless you!', pron: 'sah-LOOD' },
  ],
  es: [
    { es: '¡Hola!', trans: '¡Hola!', pron: 'OH-lah' },
    { es: 'Buenos días', trans: 'Buenos días', pron: 'BWEH-nos DEE-as' },
    { es: '¿Cuánto cuesta?', trans: '¿Cuánto cuesta?', pron: 'KWAHN-toh KWES-tah' },
    { es: 'La cuenta, por favor', trans: 'La cuenta, por favor', pron: 'lah KWEN-tah por fah-VOR' },
    {
      es: '¿Dónde está el baño?',
      trans: '¿Dónde está el baño?',
      pron: 'DON-deh es-TAH el BAH-nyoh',
    },
    { es: 'Un taxi, por favor', trans: 'Un taxi, por favor', pron: 'oon TAK-see por fah-VOR' },
    { es: 'Gracias', trans: 'Gracias', pron: 'GRAH-see-as' },
    { es: 'No entiendo', trans: 'No entiendo', pron: 'noh en-TYEN-doh' },
    { es: '¿Habla español?', trans: '¿Habla español?', pron: 'AH-blah es-pah-NYOL' },
    { es: '¡Salud!', trans: '¡Salud!', pron: 'sah-LOOD' },
  ],
  pt: [
    { es: '¡Hola!', trans: 'Olá!', pron: 'OH-lah' },
    { es: 'Buenos días', trans: 'Bom dia', pron: 'BWEH-nos DEE-as' },
    { es: '¿Cuánto cuesta?', trans: 'Quanto custa?', pron: 'KWAHN-toh KWES-tah' },
    { es: 'La cuenta, por favor', trans: 'A conta, por favor', pron: 'lah KWEN-tah por fah-VOR' },
    {
      es: '¿Dónde está el baño?',
      trans: 'Onde fica o banheiro?',
      pron: 'DON-deh es-TAH el BAH-nyoh',
    },
    { es: 'Un taxi, por favor', trans: 'Um táxi, por favor', pron: 'oon TAK-see por fah-VOR' },
    { es: 'Gracias', trans: 'Obrigado/a', pron: 'GRAH-see-as' },
    { es: 'No entiendo', trans: 'Não entendo', pron: 'noh en-TYEN-doh' },
    { es: '¿Habla portugués?', trans: 'Fala português?', pron: 'AH-blah por-too-GES' },
    { es: '¡Salud!', trans: 'Saúde!', pron: 'sah-LOOD' },
  ],
  fr: [
    { es: '¡Hola!', trans: 'Bonjour!', pron: 'OH-lah' },
    { es: 'Buenos días', trans: 'Bonjour', pron: 'BWEH-nos DEE-as' },
    { es: '¿Cuánto cuesta?', trans: 'Combien ça coûte?', pron: 'KWAHN-toh KWES-tah' },
    {
      es: 'La cuenta, por favor',
      trans: "L'addition, s'il vous plaît",
      pron: 'lah KWEN-tah por fah-VOR',
    },
    {
      es: '¿Dónde está el baño?',
      trans: 'Où sont les toilettes?',
      pron: 'DON-deh es-TAH el BAH-nyoh',
    },
    {
      es: 'Un taxi, por favor',
      trans: "Un taxi, s'il vous plaît",
      pron: 'oon TAK-see por fah-VOR',
    },
    { es: 'Gracias', trans: 'Merci', pron: 'GRAH-see-as' },
    { es: 'No entiendo', trans: 'Je ne comprends pas', pron: 'noh en-TYEN-doh' },
    { es: '¿Habla francés?', trans: 'Parlez-vous français?', pron: 'AH-blah frahn-SES' },
    { es: '¡Salud!', trans: 'Santé!', pron: 'sah-LOOD' },
  ],
  de: [
    { es: '¡Hola!', trans: 'Hallo!', pron: 'OH-lah' },
    { es: 'Buenos días', trans: 'Guten Morgen', pron: 'BWEH-nos DEE-as' },
    { es: '¿Cuánto cuesta?', trans: 'Wie viel kostet das?', pron: 'KWAHN-toh KWES-tah' },
    { es: 'La cuenta, por favor', trans: 'Die Rechnung, bitte', pron: 'lah KWEN-tah por fah-VOR' },
    {
      es: '¿Dónde está el baño?',
      trans: 'Wo ist die Toilette?',
      pron: 'DON-deh es-TAH el BAH-nyoh',
    },
    { es: 'Un taxi, por favor', trans: 'Ein Taxi, bitte', pron: 'oon TAK-see por fah-VOR' },
    { es: 'Gracias', trans: 'Danke', pron: 'GRAH-see-as' },
    { es: 'No entiendo', trans: 'Ich verstehe nicht', pron: 'noh en-TYEN-doh' },
    { es: '¿Habla alemán?', trans: 'Sprechen Sie Deutsch?', pron: 'AH-blah ah-leh-MAHN' },
    { es: '¡Salud!', trans: 'Prost!', pron: 'sah-LOOD' },
  ],
  it: [
    { es: '¡Hola!', trans: 'Ciao!', pron: 'OH-lah' },
    { es: 'Buenos días', trans: 'Buongiorno', pron: 'BWEH-nos DEE-as' },
    { es: '¿Cuánto cuesta?', trans: 'Quanto costa?', pron: 'KWAHN-toh KWES-tah' },
    { es: 'La cuenta, por favor', trans: 'Il conto, per favore', pron: 'lah KWEN-tah por fah-VOR' },
    { es: '¿Dónde está el baño?', trans: "Dov'è il bagno?", pron: 'DON-deh es-TAH el BAH-nyoh' },
    { es: 'Un taxi, por favor', trans: 'Un taxi, per favore', pron: 'oon TAK-see por fah-VOR' },
    { es: 'Gracias', trans: 'Grazie', pron: 'GRAH-see-as' },
    { es: 'No entiendo', trans: 'Non capisco', pron: 'noh en-TYEN-doh' },
    { es: '¿Habla italiano?', trans: 'Parla italiano?', pron: 'AH-blah ee-tah-LYAH-noh' },
    { es: '¡Salud!', trans: 'Salute!', pron: 'sah-LOOD' },
  ],
  zh: [
    { es: '¡Hola!', trans: '你好!', pron: 'OH-lah' },
    { es: 'Buenos días', trans: '早上好', pron: 'BWEH-nos DEE-as' },
    { es: '¿Cuánto cuesta?', trans: '多少钱?', pron: 'KWAHN-toh KWES-tah' },
    { es: 'La cuenta, por favor', trans: '请结账', pron: 'lah KWEN-tah por fah-VOR' },
    { es: '¿Dónde está el baño?', trans: '洗手间在哪?', pron: 'DON-deh es-TAH el BAH-nyoh' },
    { es: 'Un taxi, por favor', trans: '请叫出租车', pron: 'oon TAK-see por fah-VOR' },
    { es: 'Gracias', trans: '谢谢', pron: 'GRAH-see-as' },
    { es: 'No entiendo', trans: '我不懂', pron: 'noh en-TYEN-doh' },
    { es: '¿Habla chino?', trans: '你说中文吗?', pron: 'AH-blah CHEE-noh' },
    { es: '¡Salud!', trans: '干杯!', pron: 'sah-LOOD' },
  ],
  ko: [
    { es: '¡Hola!', trans: '안녕하세요!', pron: 'OH-lah' },
    { es: 'Buenos días', trans: '좋은 아침', pron: 'BWEH-nos DEE-as' },
    { es: '¿Cuánto cuesta?', trans: '얼마예요?', pron: 'KWAHN-toh KWES-tah' },
    { es: 'La cuenta, por favor', trans: '계산서 주세요', pron: 'lah KWEN-tah por fah-VOR' },
    { es: '¿Dónde está el baño?', trans: '화장실 어디예요?', pron: 'DON-deh es-TAH el BAH-nyoh' },
    { es: 'Un taxi, por favor', trans: '택시 주세요', pron: 'oon TAK-see por fah-VOR' },
    { es: 'Gracias', trans: '감사합니다', pron: 'GRAH-see-as' },
    { es: 'No entiendo', trans: '이해하지 못해요', pron: 'noh en-TYEN-doh' },
    { es: '¿Habla coreano?', trans: '한국어 하세요?', pron: 'AH-blah koh-reh-AH-noh' },
    { es: '¡Salud!', trans: '건배!', pron: 'sah-LOOD' },
  ],
  ar: [
    { es: '¡Hola!', trans: '!مرحباً', pron: 'OH-lah' },
    { es: 'Buenos días', trans: 'صباح الخير', pron: 'BWEH-nos DEE-as' },
    { es: '¿Cuánto cuesta?', trans: 'كم الثمن؟', pron: 'KWAHN-toh KWES-tah' },
    { es: 'La cuenta, por favor', trans: 'الحساب، من فضلك', pron: 'lah KWEN-tah por fah-VOR' },
    { es: '¿Dónde está el baño?', trans: 'أين الحمام؟', pron: 'DON-deh es-TAH el BAH-nyoh' },
    { es: 'Un taxi, por favor', trans: 'سيارة أجرة، من فضلك', pron: 'oon TAK-see por fah-VOR' },
    { es: 'Gracias', trans: 'شكراً', pron: 'GRAH-see-as' },
    { es: 'No entiendo', trans: 'لا أفهم', pron: 'noh en-TYEN-doh' },
    { es: '¿Habla árabe?', trans: 'هل تتكلم العربية؟', pron: 'AH-blah AH-rah-beh' },
    { es: '¡Salud!', trans: '!في صحتك', pron: 'sah-LOOD' },
  ],
  ja: [
    { es: '¡Hola!', trans: 'こんにちは！', pron: 'OH-lah' },
    { es: 'Buenos días', trans: 'おはようございます', pron: 'BWEH-nos DEE-as' },
    { es: '¿Cuánto cuesta?', trans: 'いくらですか？', pron: 'KWAHN-toh KWES-tah' },
    { es: 'La cuenta, por favor', trans: 'お会計お願いします', pron: 'lah KWEN-tah por fah-VOR' },
    {
      es: '¿Dónde está el baño?',
      trans: 'トイレはどこですか？',
      pron: 'DON-deh es-TAH el BAH-nyoh',
    },
    { es: 'Un taxi, por favor', trans: 'タクシーをお願いします', pron: 'oon TAK-see por fah-VOR' },
    { es: 'Gracias', trans: 'ありがとう', pron: 'GRAH-see-as' },
    { es: 'No entiendo', trans: 'わかりません', pron: 'noh en-TYEN-doh' },
    { es: '¿Habla japonés?', trans: '日本語を話しますか？', pron: 'AH-blah hah-poh-NES' },
    { es: '¡Salud!', trans: '乾杯！', pron: 'sah-LOOD' },
  ],
};

export function PhrasesModal() {
  const { closeModal } = useModal();
  const locale = useLocale();
  const phrases = PHRASES[locale] ?? PHRASES['en'];

  return (
    <div className={styles['modal']}>
      <div className={styles['header']}>
        <h3 className={styles['title']}>💬 Common Phrases</h3>
        <button className={styles['close']} onClick={closeModal} aria-label="Close">
          &times;
        </button>
      </div>
      <div className={styles['list']}>
        {phrases.map((p) => (
          <div key={p.es} className={styles['card']}>
            <div className={styles['spanish']}>{p.es}</div>
            <div className={styles['translation']}>{p.trans}</div>
            <div className={styles['pronunciation']}>{p.pron}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
