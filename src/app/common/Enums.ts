export enum VodServices {
    genre = 0,
    program,
    season,
    episode
}
export enum ApiControllers {
    GenreController = VodServices.genre,
    ProgramController = VodServices.program,
    SeasonController = VodServices.season,
    EpisodeController = VodServices.episode
}
export enum ImageTypes {
    Thumbnail_109_59,
    Small_303_165,
    Standard_606_366,
    Medium_460_258,
    Big_768_400,
    HeadlIne_Big_460_258,
    Headline_Small_303_165,
    Article_Default,
    Main_450_450,
    Main_303_165,
    Small_130_72

}
export enum HeadlineItemTypes {
    Big = 10,
    Video = 1,  // temporary replaced by standard item in views
    Main = 2,
    Ad = 8,
    Pair = 9,
    Small = 0,
    Alert = 6
}
