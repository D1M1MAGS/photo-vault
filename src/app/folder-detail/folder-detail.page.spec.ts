import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FolderDetailPage } from './folder-detail.page';

describe('FolderDetailPage', () => {
  let component: FolderDetailPage;
  let fixture: ComponentFixture<FolderDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FolderDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
