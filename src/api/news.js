import request from '../utils/request'

/**
 * 确保传入的分页参数是合法的数字
 */
function normalizeQuery(page, pageSize) {
    const safeSize = [4, 8, 16, 24].includes(pageSize) ? pageSize : 8
    const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1
    return { page: safePage, pageSize: safeSize }
}

/**
 * 真实 API 请求：获取新闻列表
 */
export async function fetchNewsList(query) {
    const { page: rawPage, pageSize: rawSize } = query
    const { page, pageSize } = normalizeQuery(rawPage, rawSize)

    try {
        const res = await request.get('/news', {
            params: { page, pageSize }
        })

        if (res.code === 200) {
            return res
        } else {
            throw new Error('接口状态码非200')
        }
    } catch (error) {
        console.error('获取新闻列表失败:', error)
        // 失败兜底，防止页面白屏报错
        return {
            code: 404,
            data: [],
            links: { total: 0, current: page, pageSize: pageSize }
        }
    }
}

/**
 * 真实 API 请求：获取新闻详情
 * @param {string} id 新闻唯一标识
 */
export async function fetchNewsDetail(id) {
    try {
        const res = await request.get(`/news/detail/${id}`)

        if (res && res.data) {
            return res
        } else {
            throw new Error('未获取到详情数据')
        }
    } catch (error) {
        console.error(`获取新闻详情失败 (ID: ${id}):`, error)
        return {
            code: -1,
            data: null
        }
    }
}