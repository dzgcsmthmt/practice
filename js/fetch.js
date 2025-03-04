//使用原生fetch实现一个类似axios的库，支持get、post、put、delete等请求方法，支持请求拦截、响应拦截、错误处理等功能。
class HttpClient {
    constructor(config = {}) {
        this.baseURL = config.baseURL || "/";
        this.requestInterceptors = [];
        this.responseInterceptors = [];
        this.defaultConfig = {
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 30000, // 默认超时时间：30秒
            credentials: "same-origin", // 默认携带cookie
            ...config,
        };
    }

    // 添加请求拦截器
    interceptors = {
        request: {
            use: (fulfilled, rejected) => {
                this.requestInterceptors.push({ fulfilled, rejected });
                return this.requestInterceptors.length - 1;
            },
            eject: (id) => {
                if (id !== undefined) {
                    this.requestInterceptors.splice(id, 1);
                }
            },
        },
        response: {
            use: (fulfilled, rejected) => {
                this.responseInterceptors.push({ fulfilled, rejected });
                return this.responseInterceptors.length - 1;
            },
            eject: (id) => {
                if (id !== undefined) {
                    this.responseInterceptors.splice(id, 1);
                }
            },
        },
    };

    // 超时控制
    _timeoutPromise(timeout) {
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error(`请求超时，超过 ${timeout}ms`));
            }, timeout);
        });
    }

    // 处理请求URL
    _buildURL(url) {
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }
        return `${this.baseURL}${url.startsWith("/") ? url : `/${url}`}`;
    }

    // 处理请求配置
    async _processConfig(config) {
        let processedConfig = { ...this.defaultConfig, ...config };

        // 应用请求拦截器
        for (const interceptor of this.requestInterceptors) {
            try {
                if (interceptor.fulfilled) {
                    processedConfig = await interceptor.fulfilled(
                        processedConfig
                    );
                }
            } catch (error) {
                if (interceptor.rejected) {
                    processedConfig = await interceptor.rejected(error);
                } else {
                    throw error;
                }
            }
        }

        return processedConfig;
    }

    // 处理响应
    async _processResponse(response, config) {
        let processedResponse = response;

        // 解析响应数据
        if (response.ok) {
            const contentType = response.headers.get("Content-Type") || "";
            if (contentType.includes("application/json")) {
                processedResponse.data = await response.json();
            } else if (contentType.includes("text/")) {
                processedResponse.data = await response.text();
            } else {
                processedResponse.data = await response.blob();
            }
        } else {
            // 处理HTTP错误
            const error = new Error(`请求失败，状态码: ${response.status}`);
            error.response = response;
            error.status = response.status;
            throw error;
        }

        // 应用响应拦截器
        for (const interceptor of this.responseInterceptors) {
            try {
                if (interceptor.fulfilled) {
                    processedResponse = await interceptor.fulfilled(
                        processedResponse,
                        config
                    );
                }
            } catch (error) {
                if (interceptor.rejected) {
                    processedResponse = await interceptor.rejected(error);
                } else {
                    throw error;
                }
            }
        }

        return processedResponse;
    }

    // 核心请求方法
    async request(config) {
        const controller = config.abortController || new AbortController();
        const signal = controller.signal;
        try {
            const processedConfig = await this._processConfig(config);
            const {
                url,
                method,
                data,
                params,
                headers,
                timeout,
                ...restConfig
            } = processedConfig;

            // 构建完整URL
            let fullURL = this._buildURL(url);

            // 处理URL参数
            if (params) {
                const queryParams = new URLSearchParams();
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        queryParams.append(key, value);
                    }
                });
                const queryString = queryParams.toString();
                if (queryString) {
                    fullURL +=
                        (fullURL.includes("?") ? "&" : "?") + queryString;
                }
            }

            // 处理请求体
            let body = undefined;
            if (data) {
                if (data instanceof FormData) {
                    body = data;
                    // 当使用FormData时，不要手动设置Content-Type，让浏览器自动设置
                    delete headers["Content-Type"];
                } else if (typeof data === "object") {
                    body = JSON.stringify(data);
                } else {
                    body = data;
                }
            }

            // 发起请求，并处理超时
            const fetchPromise = fetch(fullURL, {
                method: method || "GET",
                headers,
                body,
                signal,
                ...restConfig,
            });

            // 处理超时
            const response = await Promise.race([
                fetchPromise,
                this._timeoutPromise(timeout || this.defaultConfig.timeout),
            ]);

            return await this._processResponse(response, processedConfig);
        } catch (error) {
            // Check if the error is due to abortion
            if (error.name === "AbortError") {
                const abortError = new Error("Request aborted");
                abortError.isAborted = true;
                throw abortError;
            }
            // 全局错误处理
            for (const interceptor of this.responseInterceptors) {
                if (interceptor.rejected) {
                    try {
                        return await interceptor.rejected(error);
                    } catch (e) {
                        throw e;
                    }
                }
            }
            throw error;
        }
    }
    // Add abort method to cancel requests
    abort(controller) {
        if (controller && typeof controller.abort === "function") {
            controller.abort();
        }
    }
}

["get", "delete", "head", "options"].forEach((method) => {
    HttpClient.prototype[method] = function (url, config = {}) {
        return this.request({
            ...config,
            url,
            method: method.toUpperCase(),
        });
    };
});

["post", "put", "patch"].forEach((method) => {
    HttpClient.prototype[method] = function (url, data, config = {}) {
        return this.request({
            ...config,
            url,
            method: method.toUpperCase(),
            data,
        });
    };
});

// 创建默认实例
const http = new HttpClient();

// 创建自定义实例的工厂函数
http.create = function (config) {
    return new HttpClient(config);
};

window.http = http;
