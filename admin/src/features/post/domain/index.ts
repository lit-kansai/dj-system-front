// ここ自動生成したいけど一旦aspidaが生成したやつ転記する感じで
export type Post = {
  id: number
  title: string
  body: string
  userId: number
}

// これ別にここに書かなくて良くない？って感じだけど「こんな感じの値を取りうるんだろうな」って表せるからアリだと思ってる。
export type Posts = Post[]
