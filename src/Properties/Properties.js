const backEndAddress = "http://localhost:8080/"

export const properties = {
    clientId: ,
    backendUri: backEndAddress,

    oauthLoginUri: backEndAddress+'oauth/login',
    oauthLogoutUri: backEndAddress+'oauth/logout',
    chooseNicknameUri: backEndAddress+'oauth/choosenickname',

    getMyGamesUri: backEndAddress+'gameplans/my',
    createGameUri: backEndAddress+'gameplans/create',
    //this uri expect an id as path variable: http://localhost:8080/gameplans/delete/15
    deleteGameUri: backEndAddress+'gameplans/delete/'
}