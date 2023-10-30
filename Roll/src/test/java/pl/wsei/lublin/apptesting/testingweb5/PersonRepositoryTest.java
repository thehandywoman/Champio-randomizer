package pl.wsei.lublin.apptesting.testingweb5;

        import java.util.List;
        import java.util.Optional;
        import java.util.concurrent.TimeUnit;

        import org.junit.Rule;
        import org.junit.jupiter.api.BeforeAll;
        import org.junit.jupiter.api.BeforeEach;
        import org.junit.rules.Timeout;
        import org.junit.Before;
        import org.junit.jupiter.api.Test;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
        import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
        import org.junit.runner.RunWith;

        import static org.junit.jupiter.api.Assertions.*;


@DataJpaTest
public class PersonRepositoryTest {
    @Rule
    public Timeout timeout = new Timeout(1000, TimeUnit.MILLISECONDS);

    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private PersonRepository personDao;

    @BeforeEach
    public void setup() {
        assertNotNull(entityManager);
        assertNotNull(personDao);

        // przygotowanie dwóch osób:
        Person mary = new Person();
        mary.setfName("Jan");
        mary.setCompanyName("KGHM");
        entityManager.persist(mary);

        Person alex = new Person();
        alex.setfName("Aleksander");
        alex.setCompanyName("Orlen");
        entityManager.persist(alex);
    }

    @Test
    public void findAll_return_list_when_found() {
        List<Person> found = personDao.findAll();
        assertNotNull(found);
        assertEquals(2, found.size());
    }

    @Test
    public void findByCompany_return_person_when_found() {
        List<Person> found = personDao.findByCompany("KGHM");
        assertNotNull(found);
        assertEquals("Jan", found.get(0).getfName());
    }

    @Test
    public void findByCompany_return_emptylist_when_not_found() {
        List<Person> found = personDao.findByCompany("Nie istniejąca nazwa");

        assertNotNull(found);
        assertTrue(found.isEmpty());

    }

    @Test
    public void findOne_return_null_when_not_found() {
        Optional<Person> found = personDao.findById(-9);
        assertEquals(Optional.empty(), found);
    }

}
