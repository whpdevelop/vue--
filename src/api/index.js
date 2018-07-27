
/* 
    获取数据文件
*/

/* 
    豆瓣 api 
    基准路径
    http://127.0.0.1:3000/rexxar/api/v2

    电影模块接口

    首页数据
    参数
    next_date 日期(每条数据中有上一天的日期数据)
    地址
    /recommend_feed?next_date=${this.param}

    影院热映/免费在线观影/新片速递
    参数
    start: 开始位置
    count: 数量
    type:
     -> 获取影院热映数据  movie_showing
     -> 获取免费在线观影 movie_free_stream
     -> 获取新片速递 movie_latest
    地址
    /subject_collection/type/items?start=0&count=20

    影院各电影详情信息
    参数 
    id: 例如(26752088)
    地址
    /elessar/subject/id

    详情中的影人
    参数
    id: 例如(26752088)
    地址
    /movie/${id}/credits

    详情中的评论
    参数
    id: 例如(26752088)
    count: 获取评论的数量
    start: 开始索引
    type : movie/book
    地址
    /type/${id}/interests?count=${count}&&start=${start}

    图书模块接口

    图书信息接口
    参数
    start: 开始位置
    count: 数量
    type:
     -> 虚构类小说 book_fiction
     -> 非虚构类小说 book_nonfiction
     -> 豆瓣书店 market_product_book_mobile_web
    地址
    /subject_collection/type/items?start=0&count=20

    广播模块数据
    参数
    id: (每条评论的id 获取该id 之前的20条数据) 
    地址
    /status/anonymous_timeline?max_id=2023764988

*/

// 导入axios
import axios from '_axios@0.18.0@axios'
axios.defaults.baseURL = 'http://127.0.0.1:3000/rexxar/api/v2'

// 获取各种类型数据
export const getTypesData = (type, start, count) => {
    let url = `/subject_collection/${type}/items?start=${start}&count=${count}`
    return axios.get(url)
}


/* 
    电影模块
*/

// 获取首页数据
export const getIndexData = (url, data) => {
    return axios.get(url)
}

// 获取影院热映数据
export const getMovieComingData = (url, start, count) => {
    let path = url + `?start=${start}&count=${count}`
    return axios.get(path)
}

// 获取电影详情信息
export const getDetailData = (url, id) => {
    let path = url + `/${id}`
    return axios.get(path)
}

// 获取详情中的影人
export const getMoviePeople = (id) => {
    let url = `/movie/${id}/credits`
    return axios.get(url)
}

// 加载详情页中的评论
export const getDetailComment = (type, id, count = 4, start = 0) => {
    let url = `/${type}/${id}/interests?count=${count}&start=${start}`
    return axios.get(url)
}

/* 
    图书模块
*/

// 获取不同类型图书信息

export const getBookData = (url, start, count) => {
    let path = url + `?start=${start}&count=${count}`
    return axios.get(path)
}

/* 
    广播模块
*/

export const getBroadcastListData = (id = '') => {
    let url = `/status/anonymous_timeline?max_id=${id}`
    return axios.get(url)
}




