// 1.数据劫持 通过Object.defineProperty 的get和set
// 2.数据代理 通过data的遍历代理到this上
// 3.字符编译 通过{{}}对数据进行编译
// 4.发布订阅 发布订阅实现试图同步

function Mvvm (options = {}) {
  this.$options = options
  let data = this._data = this.$options.data
  observe(data)
  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get () {
        return this._data[key] // 如this.a = {b: 1}
      },
      set (newVal) {
        this._data[key] = newVal
      }
    })
  }
  //  编译
  new Compile(options.el, this)
}

function Observe (data) {
  for (let key in data) {
    let val = data[key]
    observe(val)
    Object.defineProperty(data, key, {
      configurable: true,
      get () {
        return val
      },
      set (newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        observe(newVal)
      }
    })
  }
}

function observe (data) {
  if (!data || typeof data !== 'object') return
  return new Observe(data)
}

function Compile (el, vm) {

}
