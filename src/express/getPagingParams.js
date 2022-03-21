function getPagingParams(req) {
  const { sort, limit, offset } = req.query;
  const limitNum = parseInt(limit);
  const offsetNum = parseInt(offset);
  const actualLimit = isNaN(limitNum) ? 50 : Math.min(100, limitNum);
  const actualOffset = isNaN(offsetNum) ? 0 : offsetNum;
  const actualSortOrder = sort === "DESC" ? 'DESC' : 'ASC';
  return { actualOffset, actualLimit, actualSortOrder };
}
exports.getPagingParams = getPagingParams;
