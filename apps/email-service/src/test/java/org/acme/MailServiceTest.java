package org.acme;

import io.quarkus.mailer.MockMailbox;
import io.quarkus.mailer.Mail;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.acme.mailing.MailDto;
import org.acme.mailing.MailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
public class MailServiceTest {

    @Inject
    MailService mailService;

    @Inject
    MockMailbox mailbox;

    @BeforeEach
    void clearMailbox() {
        mailbox.clear();
    }

    @Test
    void testSendEmail() {

        MailDto mailDto = new MailDto();
        mailDto.setTo("test@example.com");
        mailDto.setSubject("test subject");
        mailDto.setTextContent("this is a test");
        mailDto.setHtmlContent("<p>this is html test content</p>");

        mailService.execute(mailDto).join();

        List<Mail> sent = mailbox.getMailsSentTo("test@example.com");
        assertEquals(1, sent.size());

        Mail mail = sent.getFirst();
        assertEquals("test subject", mail.getSubject());
        assertEquals("this is a test", mail.getText());
        assertEquals("<p>this is html test content</p>", mail.getHtml());
    }

    @Test
    void testSendOnlyText() {
        MailDto mailDto = new MailDto();
        mailDto.setTo("test@example.com");
        mailDto.setSubject("test subject");
        mailDto.setTextContent("this is a test");

        mailService.execute(mailDto).join();

        Mail sent = mailbox.getMailsSentTo("test@example.com").getFirst();
        assertNull(sent.getHtml());
    }
}
