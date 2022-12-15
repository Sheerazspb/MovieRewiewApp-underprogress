const averageRatingAggregation = (movieId) => {
  return [
    {
      $lookup: {
        from: 'review',
        localField: 'rating',
        foreignField: '_id',
        as: 'avgRat'
      }
    },
    {
      $match: { parentMovie: movieId }
    },
    {
      $group: {
        _id: null,
        ratingAvg: {
          $avg: '$rating'
        },
        reviewCount: {
          $sum: 1
        }
      }
    }
  ]
}

const relatedMovieAggregation = (tags,movieId) => {
  return [
    {
      $lookup: {
        from: 'Movie',
        localField: 'tags',
        foreignField: '_id',
        as: 'relatedMovie',
      }
    },
    {
      $match: {
        tags: { $in: [...tags] },
        _id: { $ne: movieId }
      }
    },
    {
      $project: {
        title: 1,
        poster: '$poster.url'
      }
    },
    {
      $limit: 5
    }
  ]
}
const topRatedMoviesAggregation = (type) => {
  return [
    {
      $lookup: {
        from: 'Movie',
        localField: 'reviews',
        foreignField: '_id',
        as: 'topRated',
      }
    },
    {
      $match: {
        reviews: { $exists: true },
        status: { $eq: 'public'},
        type: {$eq: type}
      }
    },
    {
      $project: {
        title: 1,
        poster: '$poster.url',
        reviewCount: {$size: '$reviews'}
      }
    },
    {
      $sort: {
        reviewCount: -1
        }
    },
    {
      $limit: 5
    }
  ]
}

export { averageRatingAggregation, relatedMovieAggregation, topRatedMoviesAggregation };