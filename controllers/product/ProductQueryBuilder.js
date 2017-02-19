let EmptyQueryBuilder = require('../generic/EmptyQueryBuilder');

module.exports =
class ProductQueryBuilder extends EmptyQueryBuilder {
    build(searchQuery) {
        if (searchQuery) {
            return {
                $or: [
                    {ean: new RegExp(searchQuery, 'i')},
                    {name: new RegExp(searchQuery, 'i')}
                ]
            }
        }

        return super.build(searchQuery);
    }
};
