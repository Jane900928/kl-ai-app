import { Draft, freeze, produce } from 'immer';
import { useCallback, useState } from 'react';

/**
 * 定义修改草稿对象的函数类型
 * @template S - 状态的类型
 * @param {Draft<S>} draft - Immer 提供的草稿对象，可直接"修改"
 * @returns {void} 无返回值，通过修改 draft 实现状态更新
 */
export type DraftFunction<S> = (draft: Draft<S>) => void;

/**
 * 定义状态更新函数的类型
 * @template S - 状态的类型
 * @param {S | DraftFunction<S>} arg - 可以是新的状态值，或修改草稿的函数
 * @returns {void}
 */
export type Updater<S> = (arg: S | DraftFunction<S>) => void;

/**
 * 定义 useImmer 钩子的返回值类型
 * @template S - 状态的类型
 * @returns {[S, Updater<S>]} 元组，第一个元素是当前状态，第二个是更新函数
 */
export type ImmerHook<S> = [S, Updater<S>];

/**
 * 函数重载声明：支持初始值为直接值或返回值的函数
 * @template S - 状态的类型，默认为 unknown
 * @param {S | (() => S)} initialValue - 初始状态值，或返回初始状态的函数
 * @returns {ImmerHook<S>} 返回状态和更新函数的元组
 */
export function useImmer<S = unknown>(initialValue: S | (() => S)): ImmerHook<S>;

/**
 * useImmer 核心实现：结合 Immer 和 React 状态管理，简化不可变状态更新
 * @template T - 状态的具体类型
 * @param {T} initialValue - 初始状态值，支持直接值或返回值的函数
 * @returns {[T, Updater<T>]} 元组，包含当前状态和更新函数
 */
export function useImmer<T>(initialValue: T) {
  // 初始化状态：使用 useState 管理状态，并用 Immer 的 freeze 冻结初始值
  const [val, updateValue] = useState(
    // 处理初始值：如果是函数则执行获取返回值，否则直接使用
    // 第二个参数 true 表示深度冻结，确保所有嵌套对象都不可被修改
    freeze(
      typeof initialValue === 'function'
        ? (initialValue as () => T)() // 执行函数获取初始值
        : initialValue,
      true,
    ),
  );

  // 返回状态和更新函数（用 useCallback 缓存更新函数提升性能）
  return [
    val, // 当前状态值
    useCallback(
      (updater: T | DraftFunction<T>) => {
        // 判断更新方式：函数式更新（修改草稿）或直接赋值更新
        if (typeof updater === 'function') {
          // 函数式更新：使用 Immer 的 produce 处理
          // produce 接收当前状态和修改函数，返回新的不可变状态
          updateValue(
            produce(
              val, // 基于当前状态创建草稿
              updater as DraftFunction<T>, // 应用草稿修改逻辑
            ),
          );
        } else {
          // 直接赋值更新：冻结新值后更新状态
          // 确保新状态也是不可变的，防止意外修改
          updateValue(freeze(updater));
        }
      },
      [val], // 依赖项为当前状态，状态变化时才重新创建更新函数
    ),
  ];
}

// js实现

// import { useState } from 'react';
// import { produce, isDraft } from 'immer';

// function useImmer(initialState) {
//   const [state, setState] = useState(initialState);

//   const update = (updater) => {
//     if (typeof updater === 'function') {
//       setState(produce(updater));
//     } else {
//       // 处理直接传入状态值的情况
//       if (isDraft(updater)) {
//         throw new Error('You cannot pass a draft to setImmer');
//       }
//       setState(updater);
//     }
//   };

//   return [state, update];
// }

// export default useImmer;
