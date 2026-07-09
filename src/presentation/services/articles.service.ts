import { ArticleModel } from '../../data/mongo/models/article.model';

export class ArticlesService {
  async getArticles() {
    try {
      const articles = await ArticleModel.find();
      return articles;
    } catch (error) {
      console.error('Error fetching articles');
      throw error;
    }
  }
}
