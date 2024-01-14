// useScraping.js
import axios from 'axios';
import cheerio from 'cheerio';

export default async function useScrap(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const posts = [];

  $('table.tab tr').each((index, element) => {
    if (index > 0) {
      const columns = $(element).find('td');
      const post = {
        // UAI: columns.eq(0).text(),
        Etablissement: columns.eq(1).text(),
        ReferenceGalaxie: columns.eq(2).find('a').attr('href'),
        Article: columns.eq(4).text(),
        Corps: columns.eq(5).text(),
        Chaire: columns.eq(6).text(),
        Section1: columns.eq(7).text(),
        Section2: columns.eq(8).text(),
        Section3: columns.eq(9).text(),
        DateClotureCand: columns.eq(12).text(),
        Localisation: columns.eq(14).text(),
        Profil: columns.eq(13).text(),
      };
      posts.push(post);
    }
  });

  return posts;
}