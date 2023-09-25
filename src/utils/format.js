/**
 * 조회수, 좋아요 수 변환
 * @param {Number} number
 * @returns
 */
export function formatNumber(number) {
  let ratio = 0;
  let unit = '';

  if (number >= 1000) {
    ratio = number / 1000;
    unit = 'K';
  }

  if (number >= 1000000) {
    ratio = number / 1000000;
    unit = 'M';
  }

  // 정수로 변환 후, 문자열로 다시 변환하여 소수점 이하 0인 경우 제거
  const formattedRatio = ratio.toFixed(1).replace(/\.0$/, '');

  return `${formattedRatio}${unit}`;
}

/**
 * 시간 변환 함수
 * @param {Date} date 시간
 * @returns 게시글 작성 시간
 */
export function formatDate(date) {
  const now = new Date();
  const targetDate = new Date(date);
  const timeDifference = now - targetDate;

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const millisecondsPerMonth = 30 * millisecondsPerDay;

  if (timeDifference < millisecondsPerMonth) {
    // Less than a month ago
    const daysAgo = Math.floor(timeDifference / millisecondsPerDay);
    if (daysAgo > 0) {
      return `${daysAgo}일 전`;
    }

    const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
    if (hoursAgo > 0) {
      return `${hoursAgo}시간 전`;
    }

    const minutesAgo = Math.floor(timeDifference / (60 * 1000));
    return `${minutesAgo}분 전`;
  }

  // More than a month ago
  return date;
}
