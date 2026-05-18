import { Phrase } from './types';

import ar from './phrases/ar.json';
import de from './phrases/de.json';
import en from './phrases/en.json';
import es from './phrases/es.json';
import fr from './phrases/fr.json';
import it from './phrases/it.json';
import ja from './phrases/ja.json';
import ko from './phrases/ko.json';
import pt from './phrases/pt.json';
import zh from './phrases/zh.json';

export const phrasesData: Record<string, Phrase[]> = {
  ar,
  de,
  en,
  es,
  fr,
  it,
  ja,
  ko,
  pt,
  zh,
};

const referenceKeys = en.map((p) => p.es);
for (const [locale, phrases] of Object.entries(phrasesData)) {
  const keys = (phrases as Phrase[]).map((p) => p.es);
  const missing = referenceKeys.filter((k) => !keys.includes(k));
  const extra = keys.filter((k) => !referenceKeys.includes(k));
  if (missing.length || extra.length) {
    throw new Error(
      `phrases/${locale}.json key mismatch — missing: [${missing.join(', ')}], extra: [${extra.join(', ')}]`
    );
  }
}
