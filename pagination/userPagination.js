class UserPagination {
    constructor(query, page, limit) {
      this.query = query;
      this.page = page || 1;
      this.limit = limit || 10;
    }
  
    async getResults() {
      const startIndex = (this.page - 1) * this.limit;
      const endIndex = this.page * this.limit;
  
      const results = {};
  
      if (startIndex > 0) {
        results.previous = {
          page: this.page - 1,
          limit: this.limit,
        };
      }
  
      if (endIndex < this.query.length) {
        results.next = {
          page: this.page + 1,
          limit: this.limit,
        };
      }
  
      try {
        results.results = await this.query
          .limit(this.limit)
          .offset(startIndex)
          .exec();
  
        return results;
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = UserPagination;
  