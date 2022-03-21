import {UserState} from "@/types";
import {defineStore} from "pinia";
import { localStorage } from "@/utils/storage";
import {LoginFormData} from "@/types/api/system/login";
import { login} from "@/api/login";
import { getUserInfo } from "@/api/system/user";
const useUserStore = defineStore({
    id: "user",
    state: (): UserState => ({
        token: localStorage.get('token') || '',
        nickname: '',
        avatar: '',
        roles: [],
        perms: []
    }),
    actions: {
        async RESET_STATE() {
            this.$reset()
        },
        getUserInfo(){
            return new Promise(((resolve, reject) => {
                    getUserInfo().then(data => {
                        if (!data) {
                            return reject('Verification failed, please Login again.')
                        }
                        const { nickname, avatar, roles, perms } = data
                        if (!roles || roles.length <= 0) {
                            reject('getUserInfo: roles must be a non-null array!')
                        }
                        this.nickname = nickname
                        this.avatar = avatar
                        this.roles = roles
                        this.perms = perms
                        resolve(data)
                    }).catch(error => {
                        reject(error)
                    })
                })
            )
        },
        /**
         * 清除 Token
         */
        resetToken() {
            return new Promise(resolve => {
                localStorage.remove('token')
                this.RESET_STATE()
                resolve(null)
            })
        },
        login (userInfo: LoginFormData){
            const { username, password, code, uuid } = userInfo
            return new Promise((resolve, reject) => {
                login(
                    {
                        username: username.trim(),
                        password: password,
                        grant_type: 'captcha',
                        code: code,
                        uuid: uuid
                    }
                ).then(response => {
                    const { access_token, token_type } = response
                    const accessToken = token_type + " " + access_token
                    localStorage.set("token", accessToken)
                    this.token = accessToken
                    resolve(access_token)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})
export default useUserStore;