const backEndAddress = "http://localhost:8080/"

export const properties = {
    clientId: "586290009563-ki3e28o344hisjirre95tp6ui4sl8oh2.apps.googleusercontent.com",

    oauthLoginUri:              backEndAddress+'oauth/login',
    oauthLogoutUri:             backEndAddress+'oauth/logout',
    chooseNicknameUri:          backEndAddress+'oauth/choosenickname',

    getMyGamesUri:              backEndAddress+'gameplans/all',
    getGameByIdUri:             backEndAddress+'gameplans/getById/',
    createGameUri:              backEndAddress+'gameplans/create',
    editGameUri:                backEndAddress+'gameplans/editById/',
    deleteGameUri:              backEndAddress+'gameplans/delete/',
    inviteFriendToGame:         backEndAddress+'gameplans/inviteToGame/',
    incomingGameInvites:        backEndAddress+'gameplans/incomingGameInvites',
    declineGameInvite:          backEndAddress+'gameplans/declineGameInvite/',
    acceptGameInvite:           backEndAddress+'gameplans/acceptGameInvite/',
    removeGameMember:           backEndAddress+'gameplans/removeGameMember/',

    getMyFriendsUri:            backEndAddress+"friends/myFriends",
    inviteFriendUri:            backEndAddress+"friends/invite",
    getIncomingRequestsUri:     backEndAddress+"friends/incomingRequests",
    acceptFriendRequestUri:     backEndAddress+"friends/acceptRequest",
    removeFriendUri:            backEndAddress+"friends/removeFriend",
    getFriendsInvitableToGame:  backEndAddress+"friends/invitableToGame/"
}