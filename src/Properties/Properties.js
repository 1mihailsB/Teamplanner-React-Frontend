const backEndAddress = "https://teamplanner-springboot-rest.ey.r.appspot.com/"

export const properties = {
    clientId: "524272934250-0eeakh761npvpo8th9s1lepqobgebjj5.apps.googleusercontent.com",

    websocketsUri:              backEndAddress+"sockets",

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