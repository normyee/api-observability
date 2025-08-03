package org.acme.mailing;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

@Named("smtp")
@ApplicationScoped
public class MailService implements ISendMail {
    @Inject
    Mailer mailer;

    @Override
    public void execute(MailDto message) {

        try {
            Mail mail = Mail.withText(message.getTo(), message.getSubject(), message.getTextContent())
                    .setHtml(message.getHtmlContent());

            System.out.println("EMAIL CONFIG: " + mail);
            mailer.send(mail);

            return;
        }
        catch (Exception e) {
            System.out.println("Error has occurred: " + e);

        }


    }
}
