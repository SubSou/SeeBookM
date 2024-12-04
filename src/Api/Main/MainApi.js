import axios from 'axios';
import { localHost } from './../ApiLocalHost';

const processParseInt = (data) => {
  const chData = parseInt(data);
  return chData;
};

const processParseFloat = (data) => {
  const chData = parseFloat(data);
  return chData;
};

const processToString = (data) => {
  const chData = data.toString();
  return chData;
};

export const requestMainTextSearchBook = async (
  token,
  query,
  page,
  queryType
) => {
  try {
    const response = await axios.get(
      `${localHost}/api/book/text-search?query=${query}&page=${page}&queryType=${queryType}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      totalBookCount: response.data.totalBookCount,
      endPage: response.data.endPage,
      data: response.data.book,
      statusData: response.status,
    };
    return repsonseData;
  } catch (error) {
    return { statusData: error.response.status };
  }
};

export const requestMainDetailItem = async (token, isbn, page) => {
  try {
    const response = await axios.get(
      `${localHost}/api/book/detail-search?isbn13=${isbn}&page=${page}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    console.log('에러', error.response);
    return { statusData: error.response.status };
  }
};

export const requestMainWishListAdd = async (token, bookId) => {
  try {
    const response = await axios.post(
      `${localHost}/api/wishlist/add`,
      {
        bookId: bookId,
      },
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    console.log('에러', JSON.stringify(error.response));
    return error.response.status;
  }
};

export const requestMainWishListDelete = async (token, bookId) => {
  const formatbookId = parseInt(bookId);
  try {
    const response = await axios.delete(`${localHost}/api/wishlist/delete`, {
      headers: {
        Authorization: `${token}`, // 헤더에 토큰 추가
      },
      data: {
        bookId: formatbookId,
      },
    });
    return response.status;
  } catch (error) {
    console.log('에러', JSON.stringify(error.response));
    return error.response.status;
  }
};

export const requestMainCommentWrite = async (
  token,
  bookId,
  starRating,
  content
) => {
  const formatToken = processToString(token);
  const formatBookId = processParseInt(bookId);
  const formatStarRating = processParseFloat(starRating);
  const formatContent = processToString(content);

  try {
    const response = await axios.post(
      `${localHost}/api/review/write`,
      {
        bookId: formatBookId,
        starRating: formatStarRating,
        content: formatContent,
      },
      {
        headers: {
          Authorization: formatToken, // 헤더에 토큰 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainProfileGet = async (token) => {
  try {
    const response = await axios.get(`${localHost}/api/profile/join`, {
      headers: {
        Authorization: token, // 헤더에 토큰 추가
      },
    });

    const responseData = {
      data: response.data,
      statusData: response.status,
    };

    return responseData;
  } catch (error) {
    console.log('에러', error.response);
    return { statusData: error.response.status };
  }
};

export const requestMainLogout = async (token, provider) => {
  console.log(provider, token);
  try {
    const response = await axios.post(
      `${localHost}/api/user/logout`,
      {
        provider: provider,
      },
      {
        headers: {
          Authorization: token, // 헤더에 토큰 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    // console.log(error.response);
    return error.response.status;
  }
};

export const requestMainDeleteAccount = async (token, provider) => {
  try {
    const response = await axios.delete(
      `${localHost}/api/user/delete-account`,
      {
        headers: {
          Authorization: `${token}`,
        },

        data: {
          provider: provider,
        },
      }
    );

    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainWishListGet = async (token, page) => {
  try {
    const response = await axios.get(
      `${localHost}/api/wishlist/list?page=${page}`,
      {
        headers: {
          Authorization: token, // 헤더에 토큰 추가
        },
      }
    );

    const responseData = {
      data: response.data,
      statusData: response.status,
    };

    return responseData;
  } catch (error) {
    console.log('에러', error.response);
    return { statusData: error.response.status };
  }
};

export const requestMainCustomerSubmit = async (
  token,
  supportType,
  content
) => {
  try {
    const response = await axios.post(
      `${localHost}/api/support/request`,
      {
        supportType: supportType,
        content: content,
      },
      {
        headers: {
          Authorization: token, // 헤더에 토큰 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    console.log(error.response);
    return error.response.status;
  }
};

export const requestMainProfilePasswordValidation = async (token, password) => {
  try {
    const response = await axios.post(
      `${localHost}/api/profile/validation-password`,
      {
        password: password,
      },
      {
        headers: {
          Authorization: token, // 헤더에 토큰 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    console.log(error.response);
    return error.response.status;
  }
};

export const requestMainProfileChangePassword = async (token, password) => {
  try {
    const response = await axios.post(
      `${localHost}/api/profile/change-password`,
      {
        password: password,
      },
      {
        headers: {
          Authorization: token, // 헤더에 토큰 추가
        },
      }
    );
    return response.status;
  } catch (error) {
    console.log(error.response);
    return error.response.status;
  }
};

export const requestMainCameraSearchBook = async (token, isbn, page) => {
  try {
    const response = await axios.get(
      `${localHost}/api/book/detail-search?isbn13=${isbn}&page=${page}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };
    return repsonseData;
  } catch (error) {
    return { statusData: error.response.status };
  }
};

export const requestMainReViewDatas = async (token) => {
  try {
    const response = await axios.get(`${localHost}/api/main/join`, {
      headers: {
        Authorization: `${token}`, // 헤더에 토큰 추가
      },
    });

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    return { statusData: error.response.status };
  }
};

export const requestMainProfileChangeImage = async (token, ImageData) => {
  console.log('이미지 데이터', ImageData);

  let image = new FormData();
  image.append('image', ImageData);

  try {
    const response = await axios.post(
      `${localHost}/api/profile/change-image`,
      image,
      {
        headers: {
          Authorization: token, // 헤더에 토큰 추가
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('응답:', response);
    return response.status;
  } catch (error) {
    console.log('오류 응답:', error.response);
    return error.response.status;
  }
};

export const reqeustMainCommentCheck = async (token, reviewId) => {
  console.log(token, reviewId);
  try {
    const response = await axios.get(
      `${localHost}/api/review/validation?reviewId=${reviewId}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );
    console.log('123', response.status);

    return response.status;
  } catch (error) {
    console.log('에러', error.response);
    return error.response.status;
  }
};

export const requestMainProfileForUser = async (token, userId, page) => {
  try {
    const response = await axios.post(
      `${localHost}/api/profile/review-list`,
      {
        userId: userId,
        page: page,
      },
      {
        headers: {
          Authorization: token, // 헤더에 토큰 추가
        },
      }
    );
    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };
    return repsonseData;
  } catch (error) {
    console.log(error.response);
    return error.response.status;
  }
};

export const requestMainMyReviewsGet = async (token, page) => {
  try {
    const response = await axios.get(
      `${localHost}/api/review/list?page=${page}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    console.log('에러', error.response);
    return { statusData: error.response.status };
  }
};

export const requestMainCommentDelete = async (token, reviewId) => {
  const formatReviewId = parseInt(reviewId);
  try {
    const response = await axios.delete(`${localHost}/api/review/delete`, {
      headers: {
        Authorization: `${token}`, // 헤더에 토큰 추가
      },
      data: {
        reviewId: formatReviewId,
      },
    });
    return response.status;
  } catch (error) {
    console.log('에러', JSON.stringify(error.response));
    return error.response.status;
  }
};

export const requestMainCommentModify = async (
  token,
  reviewId,
  starRating,
  content
) => {
  try {
    const response = await axios.put(
      `${localHost}/api/review/modify`,
      {
        // 요청 데이터
        reviewId, // 실제 리뷰 ID
        starRating, // 별점
        content, // 댓글 내용
      },
      {
        // 헤더 설정
        headers: {
          Authorization: token, // 토큰을 Authorization 헤더에 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    console.log(error.response);
    return error.response ? error.response.status : 500;
  }
};

export const reqeustMainProfileNicknameVerification = async (
  token,
  nickname
) => {
  try {
    const response = await axios.get(
      `${localHost}/api/profile/validation-nickname?nickname=${nickname}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const requestMainProfileNickNameChange = async (token, nickname) => {
  console.log(token, nickname);
  try {
    const response = await axios.post(
      `${localHost}/api/profile/change-nickname`,
      {
        nickname: nickname,
      },
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    console.log('에러', JSON.stringify(error.response));
    return error.response.status;
  }
};

export const requestMainCategoriGetData = async (token, cname, page) => {
  try {
    const response = await axios.get(
      `${localHost}/api/main/category?categoryName=${cname}&page=${page}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    console.log('에러', error.response);
    return { statusData: error.response.status };
  }
};

export const requestMainLatestReviewsGet = async (token, page) => {
  try {
    const response = await axios.get(
      `${localHost}/api/main/new-book-list?page=${page}`,
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    console.log('에러', error.response);
    return { statusData: error.response.status };
  }
};

export const requestMainReport = async (
  token,
  reportedId,
  reviewId,
  reportType,
  description
) => {
  try {
    const response = await axios.post(
      `${localHost}/api/report/request-review`,
      {
        reportedId: reportedId, // 신고대상
        reviewId: reviewId, // 신고 리뷰 ID
        reportType: reportType,
        description: description,
      },
      {
        headers: {
          Authorization: `${token}`, // 헤더에 토큰 추가
        },
      }
    );

    return response.status;
  } catch (error) {
    console.log('에러', JSON.stringify(error.response));
    return error.response.status;
  }
};
