export default function getOrCreatePlayerId() {
    let id = sessionStorage.getItem("playerId");
    if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem("playerId", id);
    }
    return id;
}
