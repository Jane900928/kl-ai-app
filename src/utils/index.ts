export function formatWalletAddress(
  address: string | null | undefined,
  startLength = 6,
  endLength = 4,
): string {
  // 1. 处理空值/undefined/null
  if (!address) return '';

  // 2. 预处理参数：负数转为 0（关键：确保 validEnd 不会是负数）
  const validStart = Math.max(0, startLength);
  const validEnd = Math.max(0, endLength); // 负数→0，如 endLength=-1 → validEnd=0

  // 3. 提取前缀和地址主体（分离 0x/0X 与实际地址内容）
  const hasPrefix = address.startsWith('0x') || address.startsWith('0X');
  const prefix = hasPrefix ? address.slice(0, 2) : '';
  const body = hasPrefix ? address.slice(2) : address; // 主体不含前缀

  // 4. 短地址判断：主体长度 ≤ 起始+结尾 → 返回原地址
  if (body.length <= validStart + validEnd) {
    return address;
  }

  // 5. 截取起始部分（无论 endLength 是否为0，都需要起始部分）
  const startPart = body.slice(0, validStart);

  // 6. 处理结尾部分：validEnd=0 时不截取任何内容（关键修复点）
  const endPart = validEnd > 0 ? body.slice(-validEnd) : '';

  // 7. 拼接结果（根据 endPart 是否为空决定格式）
  if (validStart === 0 && validEnd === 0) {
    return `${prefix}...`; // 双0参数：仅前缀+省略号
  }
  // 若 endPart 为空（validEnd=0），则只拼接 "前缀+起始+..."
  return validEnd === 0 ? `${prefix}${startPart}...` : `${prefix}${startPart}...${endPart}`;
}
