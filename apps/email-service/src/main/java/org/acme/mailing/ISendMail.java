package org.acme.mailing;

import java.util.concurrent.CompletableFuture;

public interface ISendMail {
    CompletableFuture<Void> execute(MailDto message);
}
