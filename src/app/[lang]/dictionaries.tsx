const dictionaries:any = {
    en: ()=>import('../../lib/dictionaries/en.json').then(module=>module.default),
    es: ()=>import('../../lib/dictionaries/es.json').then(module=>module.default),
};

export const getDictionary = async(locale:string) => dictionaries[locale]();