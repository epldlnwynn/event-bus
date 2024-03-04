# EventBus

> EventBus 是一个简单的 WEB 端事件侦听器，提供了一种将事件分派给订阅的事件侦听器的机制。


## 安装
```shell
npm i listen-events

# or 

yarn add listen-events
```


## 案例

### 订阅事件

```typescript
    import EventBus from "listen-events";

    const testEvent = (...args: any) => {
        console.log(args)
    }
    EventBus.on('test-event', testEvent)

```

### 分派事件

```typescript
    import EventBus from "listen-events";

    const name = 'zhangsan', age = 18
    EventBus.emit("test-event", 1, {name, age})

    // 或者

    EventBus.emitAll("test-event", 1, {name, age})
```


### 关闭事件

```typescript
    import EventBus from "listen-events";

    EventBus.offs('test-event', "test-event-2")

    // 或者

    const testEvent = (...args: any) => {
        console.log(args)
    }
    EventBus.off('test-event', testEvent)

```

