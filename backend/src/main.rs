use wynd::wynd::Wynd;

#[tokio::main]
async fn main() {
    let mut wynd = Wynd::new();

    wynd.on_connection(|conn| async move {
        println!("Client connected: {}", conn.id());

        conn.on_open(|handle| async move {
            handle.send_text("Hello from wynd").await.unwrap();
        })
        .await;

        conn.on_text(|event, handle| async move {
            handle
                .send_text(format!("You said: {}", event.data).as_str())
                .await
                .unwrap();
        });
    });

    wynd.listen(3000, || {
        println!("listening on http://localhost:3000");
    })
    .await
    .unwrap();
}
