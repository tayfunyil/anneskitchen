import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Strings} from '../strings';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    RECIPE_LIST = Strings.RECIPE_LIST;
    RECIPE_TITLES: any = [];
    RECIPE_DIFFCULTIES: any = [];
    RECIPE_DESCRIPTIONS: any = [];
    RECIPE_IMAGES: any = [];
    RECIPE_CATEGORIES: any = [];

    FOOTER = Strings.FOOTER;
    filterKeyword;

    constructor(private http: HttpClient, private router: Router) {

    }

    ngOnInit(): void {
        this.RECIPE_LIST.forEach((element, index, array) => {
            this.http.get('assets/recipes/' + element + '.json', {responseType: 'json'}).subscribe(
                response => {
                    // @ts-ignore
                    this.RECIPE_TITLES.push(response.ion_title);
                    // @ts-ignore
                    this.RECIPE_CATEGORIES.push(response.category_title);
                    // @ts-ignore
                    this.RECIPE_DIFFCULTIES.push(response.difficulty);
                    // @ts-ignore
                    this.RECIPE_DESCRIPTIONS.push(response.recipe_description);
                    // @ts-ignore
                    this.RECIPE_IMAGES.push(response.ion_img);

                });
        });
    }

    goToRecipe(pageURL) {
        this.router.navigateByUrl(pageURL);
    }

    goToAbout() {
        this.router.navigateByUrl('/about');
    }

    applyFilter() {
        const l = document.getElementsByTagName('ion-card');
        const f = document.getElementsByTagName('ion-searchbar');


        if (this.filterKeyword === '') {
            Array.from(l).forEach((item, _) => {
                if (item.innerHTML.toLowerCase().indexOf(f[0].value.toLowerCase()) !== -1) {
                    item.style.display = 'block';
                }
            });
        } else {
            Array.from(l).forEach((item, _) => {
                if (item.innerHTML.toLowerCase().indexOf(f[0].value.toLowerCase()) === -1) {
                    if (item.style.display !== 'none') {
                        item.style.display = 'none';
                    }
                }
            });
        }
    }
}

