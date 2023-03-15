/** リダイレクトURL */
export type Redirect_url = string

export type Google_redirect_url = Record<string, any>
export type Spotify_redirect_url = Record<string, any>
export type Query = Record<string, any>

/** ログイン用URL */
export type Login_url = string

/** コールバックURLにパラメータとして含まれているコード（要URLデコード） */
export type Code = string

/** APIトークン */
export type Api_token = string

/** UserID */
export type User_id = number

/** GoogleUserID */
export type Google_id = string

/** Eメールアドレス */
export type Email = string

/** ユーザー名 */
export type Name = string

/** アイコンURL */
export type Icon = string

/** adminフラグ */
export type Is_admin = boolean

export type Linked_provider = {
  /** 音楽サービスの種類（"spotify" or "applemusic") */
  provider: string
  /** 連携されているかどうか */
  is_connected: boolean
}

/** RoomID */
export type Room_id = number

/** Room表示ID（URLのIDになる） */
export type Room_display_id = string

/** Room名（ページに表示される） */
export type Room_name = string

/** Room概要（管理画面用のメモ） */
export type Description = string

/** 連携するストリーミングサービスの識別子。現在は"spotify"のみ有効。 */
export type Provider = string

/** オーナーのユーザーID(プレイリストを紐づけている人) */
export type Owner_user_id = number

/** お便りID */
export type Letter_id = string

/** ラジオネーム */
export type Radio_name = string

/** お便り本文 */
export type Message = string

/** MusicID */
export type Music_id = number

/** 音楽サービスの曲ID */
export type Provided_music_id = string

/** アーティスト名 */
export type Artists = string

/** アルバム名 */
export type Album = string

/** 曲名 */
export type Music_name = string

/** サムネイル画像URL */
export type Thumbnail = string

/** 曲の長さ（秒） */
export type Duration = number

/** 音楽サービスのプレイリストID */
export type Playlist_id = string

/** プレイリスト名 */
export type Playlist_name = string

/** プレイリストのサムネイル画像URL */
export type Playlist_thumbnail = string

/** プレイリスト概要 */
export type Playlist_description = string

/** 作成日時 */
export type Created_at = string

/** 更新日時 */
export type Updated_at = string

export type Error = {
  /** エラーコード */
  code?: string | undefined
  /** エラーメッセージ */
  message?: string | undefined
}

export type OK = {
  /** 成功したか */
  ok?: boolean | undefined
}

export type OKWithId = {
  /** 成功したか */
  ok?: boolean | undefined
  /** 作成した要素のID */
  id?: string | undefined
}

export type NotFound = Error

export type UnsupportedProvider = Error

export type Unauthorized = Error

export type ProviderIsNotLinked = Error

export type BadRequest = Error

export type BadRequestOrAlreadyExists = Error

export type BadRequestOrUnsupportedProvider = Error

export type InternalServerError = Error

export type User = {
  id: User_id
  google_id: Google_id
  email: Email
  name: Name
  icon: Icon
  is_admin: Is_admin
  created_at: Created_at
  updated_at: Updated_at
  linked_providers?: Linked_provider[] | undefined
}

export type Room = {
  id: Room_id
  owner_user_id: Owner_user_id
  display_id: Room_display_id
  name: Room_name
  description: Description
  playlist_id?: Playlist_id | undefined
  provider?: Provider | undefined
  created_at: Created_at
  updated_at: Updated_at
}

/** お便り */
export type Letter = {
  id: Letter_id
  room_id: Room_id
  radio_name: Radio_name
  message: Message
  created_at: Created_at
  updated_at: Updated_at
}

export type MusicWithLetter = {
  id: Music_id
  provided_music_id: Provided_music_id
  letter_id?: Letter_id | undefined
  artists: Artists
  album: Album
  name: Music_name
  thumbnail: Thumbnail
  duration: Duration
  letter: Letter
}

export type Playlist = {
  id: Playlist_id
  name: Playlist_name
  image_url: Playlist_thumbnail
  description: Playlist_description
  provider: Provider
}

/** リクエストに保存される曲情報 */
export type Music = {
  id: Music_id
  provided_music_id: Provided_music_id
  letter_id?: Letter_id | undefined
  artists: Artists
  album: Album
  name: Music_name
  thumbnail: Thumbnail
  duration: Duration
}

export type LetterWithMusics = {
  id: Letter_id
  room_id: Room_id
  radio_name: Radio_name
  message: Message
  created_at: Created_at
  updated_at: Updated_at
  musics: Music[]
}

export type DetailedRoom = {
  id: Room_id
  owner_user_id: Owner_user_id
  display_id: Room_display_id
  name: Room_name
  description: Description
  playlist_id?: Playlist_id | undefined
  provider?: Provider | undefined
  created_at: Created_at
  updated_at: Updated_at
  users: User[]
  musics: MusicWithLetter[]
  letters: LetterWithMusics[]
}

/** 楽曲情報 */
export type Track = {
  id: Provided_music_id
  artists: Artists
  album: Album
  name: Music_name
  thumbnail: Thumbnail
  duration: Duration
}
